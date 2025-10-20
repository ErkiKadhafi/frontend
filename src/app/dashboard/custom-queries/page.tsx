import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import CumulativeSalaryTable from "./components/cumulative-salary-data-table";
import React from "react";
import DepartmentAnalysisTable from "./components/department-analysis-data-table ";
import SalaryGapTable from "./components/salary-gap-data-table ";

function FilterTableDummy() {
  return (
    <div className="mx-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-2">
      <div className="flex flex-col lg:flex-row gap-3">
        <Input
          placeholder="Search"
          className="h-9 w-full lg:w-[250px]"
          disabled
        />
      </div>
    </div>
  );
}

export default function CustomQueriesPage() {
  const [showCumulativeSalary, setShowCumulativeSalary] = React.useState(false);
  const [showDepartmentAnalysis, setShowDepartmentAnalysis] =
    React.useState(false);
  const [showSalaryGap, setShowSalaryGap] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Query 1: Cumulative Salary Calculation</ItemTitle>
          <ItemDescription>
            <span className="font-bold">Objective:</span> Calculate cumulative
            salary for each employee, ordered by employee number within each
            department.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="sm"
            onClick={() => setShowCumulativeSalary((old) => !old)}
          >
            {showCumulativeSalary ? "Hide Result" : "Show Result"}
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" className="px-0">
        <h2 className="font-semibold mx-4">Query 1 Result</h2>
        <Separator />
        <FilterTableDummy />
        <CumulativeSalaryTable visible={showCumulativeSalary} />
      </Item>
      <Separator />
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Query 2: Department Analysis by Location</ItemTitle>
          <ItemDescription>
            <span className="font-bold">Objective:</span> Find departments with
            specific characteristics and calculate averages by location.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="sm"
            onClick={() => setShowDepartmentAnalysis((old) => !old)}
          >
            {showDepartmentAnalysis ? "Hide Result" : "Show Result"}
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" className="px-0">
        <h2 className="font-semibold mx-4">Query 2 Result</h2>
        <Separator />
        <FilterTableDummy />
        <DepartmentAnalysisTable visible={showDepartmentAnalysis} />
      </Item>
      <Separator />
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>
            Query 3: Salary Ranking with Salary Gap Analysis
          </ItemTitle>
          <ItemDescription>
            <span className="font-bold">Objective:</span> Calculate salary
            rankings within each location-department group and determine the
            salary difference from the previous rank.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" onClick={() => setShowSalaryGap((old) => !old)}>
            {showSalaryGap ? "Hide Result" : "Show Result"}
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" className="px-0">
        <h2 className="font-semibold mx-4">Query 3 Result</h2>
        <Separator />
        <FilterTableDummy />
        <SalaryGapTable visible={showSalaryGap} />
      </Item>
    </div>
  );
}
