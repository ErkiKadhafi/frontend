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

import { type TQueryEmployeeRes } from "@/config/types";

import { axiosWithoutAuth } from "@/lib/axios";

type EmployeeAutoCompleteProps = {
  onValueChange: (value: { empNo: string; empName: string }) => void;
  value: { empNo: string; empName: string };
};

export default function EmployeeAutoComplete(props: EmployeeAutoCompleteProps) {
  const { onValueChange, value } = props;

  //   const session = useSession();

  const [selected, setSelected] = React.useState<Option | null>(
    value.empNo ? { value: value.empNo, label: value.empName } : null
  );
  const [inputValue, setInputValue] = React.useState<string>(value.empName);

  const queryClient = useQueryClient();
  const { data: apiResponse, isFetching } = useQuery<
    TQueryEmployeeRes,
    AxiosError
  >({
    queryKey: ["employee-search", value.empName],
    queryFn: async ({ signal }) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;

      const json = await axiosWithoutAuth.get("/v1/employees", {
        params: {
          ...(inputValue !== "" && {
            empName: inputValue,
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
        queryKey: ["employee-search"],
      });
    }, 500);

    return () => clearTimeout(debounceQuery);
  }, [inputValue]);

  React.useEffect(() => {
    if (selected && !value.empName) {
      setSelected(null);
      setInputValue("");
    }
  }, [value]);

  const autocompleteOptions = React.useMemo(() => {
    if (!apiResponse) return [];

    return apiResponse.data.map((employee) => {
      if (value.empNo === employee.empNo.toString()) {
        setInputValue(employee.empName);
        setSelected({
          label: employee.empName,
          value: employee.empNo.toString(),
        });
      }

      return {
        value: employee.empNo.toString(),
        label: employee.empName,
      };
    });
  }, [apiResponse, value]);

  return (
    <ServerSideAutoComplete
      options={autocompleteOptions}
      emptyMessage="No results."
      placeholder="Search employee name..."
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
              empNo: "",
              empName: "",
            })
          : onValueChange({
              empNo: selectedVal.value,
              empName: selectedVal.label,
            });
      }}
    />
  );
}
