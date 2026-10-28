"use client";

// Manages the form's values, validation state, submission, and reset behavior.
import { Controller, useForm } from "react-hook-form";

// Defines rules
import { z } from "zod";
// Connects Zod's validation rules to React Hook Form.
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Loader2, MapPinned, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Beach",
  "Adventure",
  "Culture",
  "Luxury",
  "Romantic",
  "Nature",
  "City",
];

// 1) Validation rules
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  country: z.string().min(2, "Country is required"),
  category: z.string().min(1, "Please select a category"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) > 0,
      "Enter a valid price greater than 0",
    ),
  duration: z.string().min(3, "Duration is required"),
  departureDate: z
    .string()
    .min(1, "Departure date is required")
    .refine((v) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(v) >= today;
    }, "Departure date cannot be in the past"),
  imageUrl: z.string().url("Enter a valid image URL"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// Shared styles
const inputClass =
  "h-11 rounded-lg border-transparent bg-muted/50 transition-colors focus-visible:bg-background";
const selectClass = `${inputClass} h-11! w-full`;
const textareaClass =
  "min-h-32 resize-none rounded-lg border-transparent bg-muted/50 transition-colors focus-visible:bg-background";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

export default function AddNewTravelPackage() {
  // 2) Form setup: Form initialization

  //   useForm() creates and manages a form instance.
  //   You can think of form as your form's control center. It gives you methods and properties for reading values, tracking errors, handling submission, and resetting the form.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      category: "",
      price: "",
      duration: "",
      departureDate: "",
      imageUrl: "",
      description: "",
    },
  });

  const { isSubmitting } = form.formState;
  const imageUrl = form.watch("imageUrl");
  const isValidImageUrl = z.string().url().safeParse(imageUrl).success;

  // 3) Submit handler
  async function onSubmit(values: FormValues) {
    // It holds the data prepared for submission.
    // ...values — copies all properties from the values object.
    // price: Number(values.price) — converts the price from a string to a number.
    const payload = { ...values, price: Number(values.price) };

    try {
      const { data: tokenData } = await authClient.token();
      const jwtToken = tokenData?.token;

      if (!jwtToken) {
        throw new Error("Jwt Token not found");
      }
      const response = await fetch("http://localhost:5000/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Check whether the server returned a successful HTTP status.
      if (!response.ok) {
        throw new Error(data.message || "Failed to add destination");
      }

      toast.success("Destination added successfully!");

      // form is the object returned by useForm().
      // Its reset() method resets the form fields to their default values.
      // In your case, those values are empty strings.
      form.reset();
    } catch (error) {
      console.error("Error adding destination:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to add destination!",
      );
    }
  }

  return (
    <section className="min-h-screen bg-muted/30 px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* Title */}
        <div className="mb-8 flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MapPinned className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Add New Travel Package
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below to publish a new destination.
            </p>
          </div>
        </div>

        <Card className="rounded-2xl border-0 shadow-sm ring-1 ring-border">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-8">
                {/* ---------- Basic info ---------- */}
                <div className="space-y-5">
                  <SectionTitle>Basic info</SectionTitle>

                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="name">Destination Name</FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Bali Paradise"
                          aria-invalid={fieldState.invalid}
                          className={inputClass}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Controller connects an input component to React Hook Form. */}
                    {/* control={form.control} gives it access to the form controller. */}
                    {/* name="name" identifies which field it manages. */}
                    {/* render describes how that field should be displayed. */}
                    <Controller
                      control={form.control}
                      name="country"
                      render={({ field, fieldState }) => (
                        // field contains the field's current value and the handlers needed to update it.
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="country">Country</FieldLabel>
                          <Input
                            //   The ... is called the spread syntax. It passes the properties inside field to Input.
                            /** Conceptually, it's similar to writing:
							 * <Input
								  name={field.name}
								  value={field.value}
								  onChange={field.onChange}
								  onBlur={field.onBlur}
								  ref={field.ref}
								/>
							 */
                            {...field}
                            id="country"
                            placeholder="Indonesia"
                            aria-invalid={fieldState.invalid}
                            className={inputClass}
                          />

                          {/* fieldState contains information about this individual field, such as whether it is invalid and what error it has. */}
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="category"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="category">Category</FieldLabel>
                          <Select
                            value={field.value}
                            onValueChange={(v) => field.onChange(v ?? "")}
                          >
                            <SelectTrigger
                              id="category"
                              aria-invalid={fieldState.invalid}
                              className={selectClass}
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                {/* ---------- Trip details ---------- */}
                <div className="space-y-5">
                  <SectionTitle>Trip details</SectionTitle>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Controller
                      control={form.control}
                      name="price"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
                          <Input
                            {...field}
                            id="price"
                            type="number"
                            min={0}
                            placeholder="e.g., 1299"
                            aria-invalid={fieldState.invalid}
                            className={inputClass}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="duration"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="duration">Duration</FieldLabel>
                          <Input
                            {...field}
                            id="duration"
                            placeholder="e.g., 7 Days/6 Nights"
                            aria-invalid={fieldState.invalid}
                            className={inputClass}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    control={form.control}
                    name="departureDate"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="departureDate">
                          Departure Date
                        </FieldLabel>
                        <Input
                          {...field}
                          id="departureDate"
                          type="date"
                          aria-invalid={fieldState.invalid}
                          className={inputClass}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                {/* ---------- Media & description ---------- */}
                <div className="space-y-5">
                  <SectionTitle>Media &amp; description</SectionTitle>

                  <Controller
                    control={form.control}
                    name="imageUrl"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                        <Input
                          {...field}
                          id="imageUrl"
                          placeholder="https://example.com/image.jpg"
                          aria-invalid={fieldState.invalid}
                          className={inputClass}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                        {isValidImageUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageUrl}
                            alt="Preview"
                            className="mt-2 h-44 w-full rounded-xl object-cover ring-1 ring-border"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                            onLoad={(e) =>
                              (e.currentTarget.style.display = "block")
                            }
                          />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="description"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="description">
                          Description
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Describe the travel experience..."
                          aria-invalid={fieldState.invalid}
                          className={textareaClass}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                {/* ---------- Actions ---------- */}
                <div className="flex items-center justify-end gap-3 border-t pt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => form.reset()}
                    disabled={isSubmitting}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 rounded-lg px-5"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Save className="size-4" />
                    )}
                    {isSubmitting ? "Saving..." : "Add Travel Package"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
