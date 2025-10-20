import type { UseFormReturn } from "react-hook-form";

import { z } from "zod";

import clsx from "clsx";

import { createLocationSchema } from "../schemas/create-location-schema";

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
import { Textarea } from "@/components/ui/textarea";

const dialogTitle = {
  CREATE: "Add new location",
  UPDATE: "Update existing location",
};

type CreateFromType = {
  type: "CREATE";
  form: UseFormReturn<z.infer<typeof createLocationSchema>>;
  onSubmit: (values: z.infer<typeof createLocationSchema>) => void;
  isSubmitting: boolean;
};

type UpdateFromType = {
  type: "UPDATE";
  form: UseFormReturn<z.infer<typeof createLocationSchema>>;
  onSubmit: (values: z.infer<typeof createLocationSchema>) => void;
  isSubmitting: boolean;
};

type FormUserDialogProps = CreateFromType | UpdateFromType;

export default function FormLocationDialog(props: FormUserDialogProps) {
  const { type, form, onSubmit, isSubmitting } = props;

  const {
    formState: { errors },
  } = form;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{dialogTitle[type]}</DialogTitle>
        <DialogDescription>Manage Location</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === "CREATE" && (
            <FormField
              control={form.control}
              name="locationCode"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-black">Location Code</FormLabel>
                  <FormControl>
                    <Input
                      className={clsx(
                        errors.locationCode && "focus-visible:ring-destructive"
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
            name="locationName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Location Name</FormLabel>
                <FormControl>
                  <Input
                    className={clsx(
                      errors.locationName && "focus-visible:ring-destructive"
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
            name="locationAddress"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-black">Location Address</FormLabel>
                <FormControl>
                  <Textarea
                    className={clsx(
                      errors.locationAddress && "focus-visible:ring-destructive"
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
