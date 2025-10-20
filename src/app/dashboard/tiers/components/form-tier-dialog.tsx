import type { UseFormReturn } from "react-hook-form";

import { z } from "zod";

import clsx from "clsx";

import { createTierSchema } from "../schemas/create-tier-schema";

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
  CREATE: "Add new tier",
  UPDATE: "Update existing tier",
};

type CreateFromType = {
  type: "CREATE";
  form: UseFormReturn<z.infer<typeof createTierSchema>>;
  onSubmit: (values: z.infer<typeof createTierSchema>) => void;
  isSubmitting: boolean;
};

type UpdateFromType = {
  type: "UPDATE";
  form: UseFormReturn<z.infer<typeof createTierSchema>>;
  onSubmit: (values: z.infer<typeof createTierSchema>) => void;
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
        <DialogDescription>Manage Tier</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === "CREATE" && (
            <FormField
              control={form.control}
              name="tierCode"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Tier Code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className={clsx(
                        errors.tierCode && "focus-visible:ring-destructive"
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
            name="tierName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Tier Name</FormLabel>
                <FormControl>
                  <Input
                    className={clsx(
                      errors.tierName && "focus-visible:ring-destructive"
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
