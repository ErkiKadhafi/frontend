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
import { useDepartmentQueryFilter } from "../hooks/use-department-query-filter";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createTierSchema } from "../schemas/create-tier-schema";
import FormDepartmentDialog from "./form-tier-dialog";
import { useCreateTiertmentMutation } from "../db/mutations/create-tier-mutation";
import { toast } from "sonner";

export default function FilterTable() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { searchFilter, setSearchFilter, setPaginationFilter } =
    useDepartmentQueryFilter();

  const form = useForm<z.infer<typeof createTierSchema>>({
    resolver: zodResolver(createTierSchema),
    defaultValues: {
      tierCode: 0,
      tierName: "",
    },
    mode: "onChange",
  });

  const createDepartmentMutation = useCreateTiertmentMutation({
    onSuccess: () => {
      toast.success("New department has been successfully added!");
      form.reset();
      setOpenDialog(false);
    },
  });

  function onSubmit(values: z.infer<typeof createTierSchema>) {
    createDepartmentMutation.mutate(values);
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
          <DialogContent className="w-[90%] max-w-xl rounded-md">
            <FormDepartmentDialog
              type="CREATE"
              form={form}
              onSubmit={onSubmit}
              isSubmitting={createDepartmentMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
