export type TPaginationRes = {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type TDepartment = {
  departmentCode: string;
  departmentName: string;
};

export type TTier = {
  tierCode: number;
  tierName: string;
};

export type TLocation = {
  locationCode: string;
  locationName: string;
  locationAddress: string;
};

export type TEmployee = {
  empNo: number;
  department: TDepartment | null;
  location: TLocation;
  tier: TTier;
  supervisor: {
    empNo: number;
    empName: string;
  } | null;
  empName: string;
  salary: number;
  entryDate: string;
};

export type TCumulativeSalary = {
  departmentCode: string;
  empNo: number;
  empName: string;
  cumulativeSalary: number;
};

export type TDepartmentAnalysis = {
  locationName: string;
  deptWithMostEmployees: number;
  deptEmployeeCount: string;
  avgSalaryOfLowestDep: number;
};

export type TSalaryGap = {
  locationName: string;
  deptName: string;
  empName: string;
  tierName: string;
  salary: number;
  rank: number;
  salaryGap: number;
};

export type TQueryDepartmentRes = {
  data: TDepartment[];
} & TPaginationRes;

export type TQueryTierRes = {
  data: TTier[];
} & TPaginationRes;

export type TQueryLocationRes = {
  data: TLocation[];
} & TPaginationRes;

export type TQueryEmployeeRes = {
  data: TEmployee[];
} & TPaginationRes;
