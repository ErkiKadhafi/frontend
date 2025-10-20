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
import { useLocationQueryFilter } from "../hooks/use-location-query-filter";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createLocationSchema } from "../schemas/create-location-schema";

import FormLocationDialog from "./form-location-dialog";
import { useCreateLocationMutation } from "../db/mutations/create-locations-mutation";
import { toast } from "sonner";

export default function FilterTable() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { searchFilter, setSearchFilter, setPaginationFilter } =
    useLocationQueryFilter();

  const form = useForm<z.infer<typeof createLocationSchema>>({
    resolver: zodResolver(createLocationSchema),
    defaultValues: {
      locationCode: "",
      locationName: "",
      locationAddress: "",
    },
    mode: "onChange",
  });

  const createLocationMutation = useCreateLocationMutation({
    onSuccess: () => {
      toast.success("New location has been successfully added!");
      form.reset();
      setOpenDialog(false);
    },
  });

  function onSubmit(values: z.infer<typeof createLocationSchema>) {
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
          <DialogContent className="w-[90%] max-w-xl rounded-md">
            <FormLocationDialog
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
