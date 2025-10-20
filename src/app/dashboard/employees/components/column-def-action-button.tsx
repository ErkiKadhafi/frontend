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
import FormDepartmentDialog from "./form-employee-dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { TEmployee } from "@/config/types";
import { Spinner } from "@/components/ui/spinner";
import { useUpdatEmployeeMutation } from "../db/mutations/update-employee-mutation";
import { createEmployeeSchema } from "../schemas/create-employee-schema";
import { useDeleteEmployeeMutation } from "../db/mutations/delete-employee-mutation";

type ActionButtonProps = {
  info: CellContext<TEmployee, unknown>;
};

export default function ColumnDefActionButton({ info }: ActionButtonProps) {
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogAlert, setOpenDialogAlert] = React.useState(false);

  const form = useForm<z.infer<typeof createEmployeeSchema>>({
    resolver: zodResolver(createEmployeeSchema),
    values: {
      empNo: info.row.original.empNo,
      department: {
        departmentCode: info.row.original.department
          ? info.row.original.department.departmentCode
          : "",
        departmentName: info.row.original.department
          ? info.row.original.department.departmentName
          : "",
      },
      tier: {
        tierCode: info.row.original.tier.tierCode.toString(),
        tierName: info.row.original.tier.tierName,
      },
      location: {
        locationCode: info.row.original.location.locationCode,
        locationName: info.row.original.location.locationName,
      },
      supervisor: {
        empNo: info.row.original.supervisor
          ? info.row.original.supervisor.empNo.toString()
          : "",
        empName: info.row.original.supervisor
          ? info.row.original.supervisor.empName
          : "",
      },
      empName: info.row.original.empName,
      salary: info.row.original.salary,
    },
    mode: "onChange",
  });

  const updateEmployeemutation = useUpdatEmployeeMutation({
    empNo: info.row.original.empNo,
    onSuccess: () => {
      toast.success("Employee has been successfully updated!");
      setOpenDialogEdit(false);
      form.reset();
    },
  });

  const deleteEmployeeMutation = useDeleteEmployeeMutation({
    empNo: info.row.original.empNo,
    onSuccess: () => {
      toast.success("Employee has been successfully deleted!");
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
              onSubmit={(values) => updateEmployeemutation.mutate(values)}
              isSubmitting={updateEmployeemutation.isPending}
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
                {deleteEmployeeMutation.isPending && <Spinner />}
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                onClick={() => deleteEmployeeMutation.mutate()}
              >
                {deleteEmployeeMutation.isPending && <Spinner />}
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
