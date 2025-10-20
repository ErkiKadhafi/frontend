import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import DataTable from "./components/data-table";
import FilterTable from "./components/filter-table";

export default function LocationListPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Location</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-0 gap-0">
        <h2 className="mx-4 my-4 text-md font-semibold md:text-xl ">
          Location List
        </h2>
        <Separator />
        <FilterTable />
        <DataTable />
      </Card>
    </div>
  );
}
