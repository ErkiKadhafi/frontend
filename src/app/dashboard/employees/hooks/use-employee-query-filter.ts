import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";

// import { USER_ACCOUNT_STATUS, USER_ROLES } from "@/config/constants";

export const useEmployeeQueryFilter = () => {
  const [searchFilter, setSearchFilter] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 1000,
    shallow: false,
    history: "push",
  });
  // const [roleFilter, setRoleFilter] = useQueryState("role", {
  //   defaultValue: "",
  //   shallow: false,
  //   history: "push",
  //   parse: (value: any) => (USER_ROLES.includes(value) ? value : ""),
  // });
  // const [accountStatusFilter, setAccountStatusFilter] = useQueryState(
  //   "accountStatus",
  //   {
  //     defaultValue: "",
  //     shallow: false,
  //     history: "push",
  //     parse: (value: any) => (USER_ACCOUNT_STATUS.includes(value) ? value : ""),
  //   }
  // );
  const [paginationFilter, setPaginationFilter] = useQueryStates(
    {
      page: parseAsInteger.withDefault(0),
      limit: parseAsInteger.withDefault(10),
    },
    {
      shallow: false,
      history: "push",
      scroll: false,
    }
  );

  return {
    searchFilter,
    setSearchFilter,
    // roleFilter,
    // setRoleFilter,
    // accountStatusFilter,
    // setAccountStatusFilter,
    paginationFilter,
    setPaginationFilter,
  };
};
