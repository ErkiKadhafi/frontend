import type { UseFormReturn } from "react-hook-form";

import { z } from "zod";

import clsx from "clsx";

import { createEmployeeSchema } from "../schemas/create-employee-schema";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import TierAutoComplete from "./tier-autocomplete";
import DepartmentAutoComplete from "./department-autocomplete";
import LocationAutoComplete from "./location-autocomplete";
import EmployeeAutoComplete from "./employee-autocomplete";

const dialogTitle = {
  CREATE: "Add new employee",
  UPDATE: "Update existing employee",
};

type CreateFromType = {
  type: "CREATE";
  form: UseFormReturn<z.infer<typeof createEmployeeSchema>>;
  onSubmit: (values: z.infer<typeof createEmployeeSchema>) => void;
  isSubmitting: boolean;
};

type UpdateFromType = {
  type: "UPDATE";
  form: UseFormReturn<z.infer<typeof createEmployeeSchema>>;
  onSubmit: (values: z.infer<typeof createEmployeeSchema>) => void;
  isSubmitting: boolean;
};

type FormUserDialogProps = CreateFromType | UpdateFromType;

export default function FormEmployeeDialog(props: FormUserDialogProps) {
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
              name="empNo"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Employee Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className={clsx(
                        errors.empNo && "focus-visible:ring-destructive"
                      )}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="empName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Employee Name</FormLabel>
                <FormControl>
                  <Input
                    className={clsx(
                      errors.empName && "focus-visible:ring-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Employee Salary</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className={clsx(
                      errors.salary && "focus-visible:ring-destructive"
                    )}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tier"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Tier Name</FormLabel>
                <FormControl>
                  <TierAutoComplete
                    onValueChange={(selectedVal) => field.onChange(selectedVal)}
                    value={{
                      tierCode: form.watch("tier.tierCode") || "",
                      tierName: form.watch("tier.tierName") || "",
                    }}
                  />
                </FormControl>
                {errors.tier && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.tier?.tierCode?.message}
                  </p>
                )}
                <FormDescription>
                  Type manually if you don&apos;t find the wanted tier in the
                  list.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Department Name</FormLabel>
                <FormControl>
                  <DepartmentAutoComplete
                    onValueChange={(selectedVal) => field.onChange(selectedVal)}
                    value={{
                      departmentCode:
                        form.watch("department.departmentCode") || "",
                      departmentName:
                        form.watch("department.departmentName") || "",
                    }}
                  />
                </FormControl>
                {errors.department && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.department?.departmentCode?.message}
                  </p>
                )}
                <FormDescription>
                  Type manually if you don&apos;t find the wanted department in
                  the list.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Location Name</FormLabel>
                <FormControl>
                  <LocationAutoComplete
                    onValueChange={(selectedVal) => field.onChange(selectedVal)}
                    value={{
                      locationCode: form.watch("location.locationCode") || "",
                      locationName: form.watch("location.locationName") || "",
                    }}
                  />
                </FormControl>
                {errors.location && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.location?.locationCode?.message}
                  </p>
                )}
                <FormDescription>
                  Type manually if you don&apos;t find the wanted location in
                  the list.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supervisor"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Supervisor Name</FormLabel>
                <FormControl>
                  <EmployeeAutoComplete
                    onValueChange={(selectedVal) => field.onChange(selectedVal)}
                    value={{
                      empNo: form.watch("supervisor.empNo") || "",
                      empName: form.watch("supervisor.empName") || "",
                    }}
                  />
                </FormControl>
                {errors.supervisor && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.supervisor?.empNo?.message}
                  </p>
                )}
                <FormDescription>
                  Type manually if you don&apos;t find the wanted location in
                  the list.
                </FormDescription>
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
