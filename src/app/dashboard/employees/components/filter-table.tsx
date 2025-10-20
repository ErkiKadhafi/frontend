import React from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectSeparator,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useEmployeeQueryFilter } from "../hooks/use-employee-query-filter";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createEmployeeSchema } from "../schemas/create-employee-schema";
import FormDepartmentDialog from "./form-employee-dialog";
import { useCreateEmployeeMutation } from "../db/mutations/create-employee-mutation";
import { toast } from "sonner";

export default function FilterTable() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { searchFilter, setSearchFilter, setPaginationFilter } =
    useEmployeeQueryFilter();

  const form = useForm<z.infer<typeof createEmployeeSchema>>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      empNo: 0,
      department: {
        departmentCode: "",
        departmentName: "",
      },
      tier: {
        tierCode: "",
        tierName: "",
      },
      location: {
        locationCode: "",
        locationName: "",
      },
      supervisor: {
        empNo: "",
        empName: "",
      },
      empName: "",
      salary: 0,
    },
    mode: "onChange",
  });

  const createLocationMutation = useCreateEmployeeMutation({
    onSuccess: () => {
      toast.success("New department has been successfully added!");
      form.reset();
      setOpenDialog(false);
    },
  });

  function onSubmit(values: z.infer<typeof createEmployeeSchema>) {
    createLocationMutation.mutate(values);
  }

  return (
    <div className="mx-4 my-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-2">
      <div className="flex flex-col lg:flex-row gap-3">
        <Input
          placeholder="Search"
          className="h-9 w-full lg:w-[250px]"
          value={searchFilter}
          onChange={(e) => {
            setPaginationFilter((old) => ({ ...old, page: 0 }));
            e.target.value === ""
              ? setSearchFilter(null)
              : setSearchFilter(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <Dialog
          open={openDialog}
          onOpenChange={(val) => {
            // createUserForm.reset();
            setOpenDialog(val);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] max-w-2xl rounded-md h-[90vh] overflow-scroll">
            <FormDepartmentDialog
              type="CREATE"
              form={form}
              onSubmit={onSubmit}
              isSubmitting={createLocationMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
