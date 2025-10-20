import React from "react";
// import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  type Option,
  ServerSideAutoComplete,
} from "@/components/server-side-autocomplete";

import { type TQueryLocationRes } from "@/config/types";

import { axiosWithoutAuth } from "@/lib/axios";

type LocationAutoCompleteProps = {
  onValueChange: (value: {
    locationCode: string;
    locationName: string;
  }) => void;
  value: { locationCode: string; locationName: string };
};

export default function LocationAutoComplete(props: LocationAutoCompleteProps) {
  const { onValueChange, value } = props;

  //   const session = useSession();

  const [selected, setSelected] = React.useState<Option | null>(
    value.locationCode
      ? { value: value.locationCode, label: value.locationName }
      : null
  );
  const [inputValue, setInputValue] = React.useState<string>(
    value.locationName
  );

  const queryClient = useQueryClient();
  const { data: apiResponse, isFetching } = useQuery<
    TQueryLocationRes,
    AxiosError
  >({
    queryKey: ["location-search", value.locationName],
    queryFn: async ({ signal }) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;

      const json = await axiosWithoutAuth.get("/v1/locations", {
        params: {
          ...(inputValue !== "" && {
            locationName: inputValue,
          }),
          limit: 5,
          type: "active",
        },
        signal,
      });

      return json.data;
    },
    placeholderData: keepPreviousData,
    // enabled: session.status === "authenticated",
  });

  React.useEffect(() => {
    const debounceQuery = setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["location-search"],
      });
    }, 500);

    return () => clearTimeout(debounceQuery);
  }, [inputValue]);

  React.useEffect(() => {
    if (selected && !value.locationName) {
      setSelected(null);
      setInputValue("");
    }
  }, [value]);

  const autocompleteOptions = React.useMemo(() => {
    if (!apiResponse) return [];

    return apiResponse.data.map((tier) => {
      if (value.locationCode === tier.locationCode.toString()) {
        setInputValue(tier.locationName);
        setSelected({
          label: tier.locationName,
          value: tier.locationCode.toString(),
        });
      }

      return {
        value: tier.locationCode.toString(),
        label: tier.locationName,
      };
    });
  }, [apiResponse, value]);

  return (
    <ServerSideAutoComplete
      options={autocompleteOptions}
      emptyMessage="No results."
      placeholder="Search location name..."
      isLoading={isFetching}
      inputValue={inputValue}
      onInputChange={(inputVal) => {
        setInputValue(inputVal);
      }}
      selected={selected}
      onValueChange={(selectedVal) => {
        setSelected(selectedVal);
        !selectedVal
          ? onValueChange({
              locationCode: "",
              locationName: "",
            })
          : onValueChange({
              locationCode: selectedVal.value,
              locationName: selectedVal.label,
            });
      }}
    />
  );
}
