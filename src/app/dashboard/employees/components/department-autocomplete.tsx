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

import { type TQueryDepartmentRes } from "@/config/types";

import { axiosWithoutAuth } from "@/lib/axios";

type DepartmentAutoCompleteProps = {
  onValueChange: (value: {
    departmentCode: string;
    departmentName: string;
  }) => void;
  value: { departmentCode: string; departmentName: string };
};

export default function DepartmentAutoComplete(
  props: DepartmentAutoCompleteProps
) {
  const { onValueChange, value } = props;

  //   const session = useSession();

  const [selected, setSelected] = React.useState<Option | null>(
    value.departmentCode
      ? { value: value.departmentCode, label: value.departmentName }
      : null
  );
  const [inputValue, setInputValue] = React.useState<string>(
    value.departmentName
  );

  const queryClient = useQueryClient();
  const { data: apiResponse, isFetching } = useQuery<
    TQueryDepartmentRes,
    AxiosError
  >({
    queryKey: ["department-search", value.departmentName],
    queryFn: async ({ signal }) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;

      const json = await axiosWithoutAuth.get("/v1/departments", {
        params: {
          ...(inputValue !== "" && {
            departmentName: inputValue,
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
        queryKey: ["department-search"],
      });
    }, 500);

    return () => clearTimeout(debounceQuery);
  }, [inputValue]);

  React.useEffect(() => {
    if (selected && !value.departmentName) {
      setSelected(null);
      setInputValue("");
    }
  }, [value]);

  const autocompleteOptions = React.useMemo(() => {
    if (!apiResponse) return [];

    return apiResponse.data.map((tier) => {
      if (value.departmentCode === tier.departmentCode.toString()) {
        setInputValue(tier.departmentName);
        setSelected({
          label: tier.departmentName,
          value: tier.departmentCode.toString(),
        });
      }

      return {
        value: tier.departmentCode.toString(),
        label: tier.departmentName,
      };
    });
  }, [apiResponse, value]);

  return (
    <ServerSideAutoComplete
      options={autocompleteOptions}
      emptyMessage="No results."
      placeholder="Search department name..."
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
              departmentCode: "",
              departmentName: "",
            })
          : onValueChange({
              departmentCode: selectedVal.value,
              departmentName: selectedVal.label,
            });
      }}
    />
  );
}
