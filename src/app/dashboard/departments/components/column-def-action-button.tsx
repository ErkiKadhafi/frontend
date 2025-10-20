import React from "react";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import type { CellContext } from "@tanstack/react-table";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FormDepartmentDialog from "./form-department-dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { TDepartment } from "@/config/types";
import { Spinner } from "@/components/ui/spinner";
import { useUpdatDepartmentMutation } from "../db/mutations/update-department-mutation";
import { createDepartmentSchema } from "../schemas/create-department-schema";
import { useDeleteDepartmentMutation } from "../db/mutations/delete-department-mutation";

type ActionButtonProps = {
  info: CellContext<TDepartment, unknown>;
};

export default function ColumnDefActionButton({ info }: ActionButtonProps) {
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogAlert, setOpenDialogAlert] = React.useState(false);

  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    values: {
      departmentCode: info.row.original.departmentCode,
      departmentName: info.row.original.departmentName,
    },
    mode: "onChange",
  });

  const updateCategorymutation = useUpdatDepartmentMutation({
    departmentCode: info.row.original.departmentCode,
    onSuccess: () => {
      toast.success("Department has been successfully updated!");
      setOpenDialogEdit(false);
      form.reset();
    },
  });

  const deleteDepartmentMutation = useDeleteDepartmentMutation({
    departmentCode: info.row.original.departmentCode,
    onSuccess: () => {
      toast.success("Department has been successfully deleted!");
      setOpenDialogAlert(false);
    },
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-6 w-6 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Dialog
          open={openDialogEdit}
          onOpenChange={(val) => {
            form.reset();
            setOpenDialogEdit(val);
          }}
        >
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="w-[90%] max-w-xl rounded-md">
            <FormDepartmentDialog
              type="UPDATE"
              form={form}
              onSubmit={(values) => updateCategorymutation.mutate(values)}
              isSubmitting={updateCategorymutation.isPending}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog
          open={openDialogAlert}
          onOpenChange={(val) => setOpenDialogAlert(val)}
        >
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="mb-1">
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setOpenDialogAlert(false)}
              >
                {deleteDepartmentMutation.isPending && <Spinner />}
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                onClick={() => deleteDepartmentMutation.mutate()}
              >
                {deleteDepartmentMutation.isPending && <Spinner />}
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
