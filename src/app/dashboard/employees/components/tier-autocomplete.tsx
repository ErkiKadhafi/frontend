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

import { type TQueryTierRes } from "@/config/types";

import { axiosWithoutAuth } from "@/lib/axios";

type TierAutoCompleteProps = {
  onValueChange: (value: { tierCode: string; tierName: string }) => void;
  value: { tierCode: string; tierName: string };
};

export default function TierAutoComplete(props: TierAutoCompleteProps) {
  const { onValueChange, value } = props;

  //   const session = useSession();

  const [selected, setSelected] = React.useState<Option | null>(
    value.tierCode ? { value: value.tierCode, label: value.tierName } : null
  );
  const [inputValue, setInputValue] = React.useState<string>(value.tierName);

  const queryClient = useQueryClient();
  const { data: apiResponse, isFetching } = useQuery<TQueryTierRes, AxiosError>(
    {
      queryKey: ["tier-search", value.tierName],
      queryFn: async ({ signal }) => {
        //   if (!session.data) return;

        //   const accessToken = session.data.user.accessToken;

        const json = await axiosWithoutAuth.get("/v1/tiers", {
          params: {
            ...(inputValue !== "" && {
              tierName: inputValue,
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
    }
  );

  React.useEffect(() => {
    const debounceQuery = setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["tier-search"],
      });
    }, 500);

    return () => clearTimeout(debounceQuery);
  }, [inputValue]);

  React.useEffect(() => {
    if (selected && !value.tierName) {
      setSelected(null);
      setInputValue("");
    }
  }, [value]);

  const autocompleteOptions = React.useMemo(() => {
    if (!apiResponse) return [];

    return apiResponse.data.map((tier) => {
      if (value.tierCode === tier.tierCode.toString()) {
        setInputValue(tier.tierName);
        setSelected({ label: tier.tierName, value: tier.tierCode.toString() });
      }

      return {
        value: tier.tierCode.toString(),
        label: tier.tierName,
      };
    });
  }, [apiResponse, value]);

  return (
    <ServerSideAutoComplete
      options={autocompleteOptions}
      emptyMessage="No results."
      placeholder="Search tier name..."
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
              tierCode: "",
              tierName: "",
            })
          : onValueChange({
              tierCode: selectedVal.value,
              tierName: selectedVal.label,
            });
      }}
    />
  );
}
