import type { UseFormReturn } from "react-hook-form";

import { z } from "zod";

import clsx from "clsx";

import { createDepartmentSchema } from "../schemas/create-department-schema";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const dialogTitle = {
  CREATE: "Add new department",
  UPDATE: "Update existing department",
};

type CreateFromType = {
  type: "CREATE";
  form: UseFormReturn<z.infer<typeof createDepartmentSchema>>;
  onSubmit: (values: z.infer<typeof createDepartmentSchema>) => void;
  isSubmitting: boolean;
};

type UpdateFromType = {
  type: "UPDATE";
  form: UseFormReturn<z.infer<typeof createDepartmentSchema>>;
  onSubmit: (values: z.infer<typeof createDepartmentSchema>) => void;
  isSubmitting: boolean;
};

type FormUserDialogProps = CreateFromType | UpdateFromType;

export default function FormDepartmentDialog(props: FormUserDialogProps) {
  const { type, form, onSubmit, isSubmitting } = props;

  const {
    formState: { errors },
  } = form;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{dialogTitle[type]}</DialogTitle>
        <DialogDescription>Manage department</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === "CREATE" && (
            <FormField
              control={form.control}
              name="departmentCode"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Department Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className={clsx(
                        errors.departmentCode &&
                          "focus-visible:ring-destructive"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="departmentName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Department Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    className={clsx(
                      errors.departmentName && "focus-visible:ring-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                size="sm"
              >
                {isSubmitting && <Spinner />}
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting && <Spinner />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
