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
import FormDepartmentDialog from "./form-location-dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { TLocation } from "@/config/types";
import { Spinner } from "@/components/ui/spinner";
import { useUpdatLocationMutation } from "../db/mutations/update-locations-mutation";
import { createLocationSchema } from "../schemas/create-location-schema";
import { useDeleteLocationMutation } from "../db/mutations/delete-locations-mutation";

type ActionButtonProps = {
  info: CellContext<TLocation, unknown>;
};

export default function ColumnDefActionButton({ info }: ActionButtonProps) {
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogAlert, setOpenDialogAlert] = React.useState(false);

  const form = useForm<z.infer<typeof createLocationSchema>>({
    resolver: zodResolver(createLocationSchema),
    values: {
      locationCode: info.row.original.locationCode,
      locationName: info.row.original.locationName,
      locationAddress: info.row.original.locationAddress,
    },
    mode: "onChange",
  });

  const updateLocationmutation = useUpdatLocationMutation({
    locationCode: info.row.original.locationCode,
    onSuccess: () => {
      toast.success("Location has been successfully updated!");
      setOpenDialogEdit(false);
      form.reset();
    },
  });

  const deleteLocationMutation = useDeleteLocationMutation({
    locationCode: info.row.original.locationCode,
    onSuccess: () => {
      toast.success("Location has been successfully deleted!");
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
              onSubmit={(values) => updateLocationmutation.mutate(values)}
              isSubmitting={updateLocationmutation.isPending}
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
                {deleteLocationMutation.isPending && <Spinner />}
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                onClick={() => deleteLocationMutation.mutate()}
              >
                {deleteLocationMutation.isPending && <Spinner />}
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
