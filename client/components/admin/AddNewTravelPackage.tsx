"use client";

import { useState, type ReactNode } from "react";

// Manages the form's values, validation state, submission, and reset behavior.
import { Controller, useForm } from "react-hook-form";
// Defines the validation rules
import { z } from "zod";
// Connects Zod's rules to React Hook Form.
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";
import {
  CalendarDays,
  Clock,
  Compass,
  DollarSign,
  Eye,
  Globe,
  Image as ImageIcon,
  Loader2,
  MapPin,
  MapPinned,
  Plane,
  RotateCcw,
  Save,
  Sparkles,
  Tag,
  type LucideIcon,
} from "lucide-react";

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
import {
  categoryList,
  getCategoryMeta,
} from "@/components/Destination/category-meta";

// Same list the destinations page filters by (minus "All")
const categories = categoryList.filter((c) => c !== "All");

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
  "h-12 rounded-2xl border-0 bg-cyan-50/70 pl-12 text-sm font-semibold text-slate-800 transition-colors placeholder:font-medium placeholder:text-slate-400 hover:bg-cyan-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-400 aria-invalid:ring-2 aria-invalid:ring-rose-300";
const labelClass = "text-sm font-bold text-slate-700";
const textareaClass =
  "min-h-32 resize-none rounded-2xl border-0 bg-cyan-50/70 p-4 text-sm font-medium leading-6 text-slate-800 transition-colors placeholder:text-slate-400 hover:bg-cyan-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-400 aria-invalid:ring-2 aria-invalid:ring-rose-300";

// Input with a small icon tile on the left
function IconWrap({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
        <Icon className="size-4" />
      </span>
      {children}
    </div>
  );
}

function SectionTitle({
  step,
  title,
  hint,
  tone,
}: {
  step: number;
  title: string;
  hint: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex size-10 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br text-base font-extrabold text-white shadow-md ${tone}`}
      >
        {step}
      </span>
      <div>
        <p className="text-base font-extrabold text-slate-900">{title}</p>
        <p className="text-xs font-medium text-slate-500">{hint}</p>
      </div>
    </div>
  );
}

export default function AddNewTravelPackage() {
  // 2) Form setup
  // useForm() creates a form instance: read values, track errors, submit, reset.
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
  const values = form.watch();

  // Live preview helpers
  const [failedUrl, setFailedUrl] = useState("");
  const isValidImageUrl = z.string().url().safeParse(values.imageUrl).success;
  const showImage = isValidImageUrl && failedUrl !== values.imageUrl;
  const meta = values.category ? getCategoryMeta(values.category) : null;
  const priceNumber = Number(values.price);
  const previewPrice =
    !isNaN(priceNumber) && priceNumber > 0 ? priceNumber.toLocaleString() : "0";
  const previewDate = values.departureDate
    ? new Date(`${values.departureDate}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Departure";

  // 3) Submit handler
  async function onSubmit(formValues: FormValues) {
    // Convert the price from a string to a number before sending.
    const payload = { ...formValues, price: Number(formValues.price) };

    try {
      const { data: tokenData } = await authClient.token();
      const jwtToken = tokenData?.token;

      if (!jwtToken) {
        throw new Error("Jwt Token not found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-destination`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add destination");
      }

      toast.success("Destination added successfully!");

      // Reset every field back to its default (empty) value.
      form.reset();
    } catch (error) {
      console.error("Error adding destination:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to add destination!",
      );
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 pb-16">
      {/* Page header */}
      <section className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 shadow-2xl shadow-cyan-300/50">
          <span className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-linear-to-br from-amber-200 to-orange-300 opacity-90" />
          <span className="pointer-events-none absolute left-1/2 top-8 size-2 rounded-full bg-amber-200" />
          <Plane className="pointer-events-none absolute right-24 top-8 hidden size-9 -rotate-12 text-white/90 md:block" />

          <div className="relative flex items-center gap-5 px-6 pb-20 pt-10 sm:px-12 lg:px-16">
            <span className="flex size-16 shrink-0 rotate-3 items-center justify-center rounded-3xl bg-white text-orange-500 shadow-xl shadow-sky-900/20">
              <MapPinned className="size-8" />
            </span>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/40 backdrop-blur">
                <Sparkles className="size-3.5" />
                Share a new adventure
              </span>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                Add New Travel Package
              </h1>
              <p className="mt-1 text-sm font-medium text-white/90">
                Fill in the details below to publish a new destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto -mt-12 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        {/* ---------- Form ---------- */}
        <div className="relative rounded-3xl bg-white p-6 shadow-xl shadow-cyan-200/50 ring-1 ring-cyan-100 sm:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-9">
              {/* Basic info */}
              <div className="space-y-5">
                <SectionTitle
                  step={1}
                  title="Basic info"
                  hint="Where are we going?"
                  tone="from-cyan-400 to-sky-500"
                />

                {/* Controller connects an input component to React Hook Form. */}
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name" className={labelClass}>
                        Destination Name
                      </FieldLabel>
                      <IconWrap icon={Compass}>
                        {/* {...field} passes value, onChange, onBlur, name and ref */}
                        <Input
                          {...field}
                          id="name"
                          placeholder="Bali Paradise"
                          aria-invalid={fieldState.invalid}
                          className={inputClass}
                        />
                      </IconWrap>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Controller
                    control={form.control}
                    name="country"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="country" className={labelClass}>
                          Country
                        </FieldLabel>
                        <IconWrap icon={Globe}>
                          <Input
                            {...field}
                            id="country"
                            placeholder="Indonesia"
                            aria-invalid={fieldState.invalid}
                            className={inputClass}
                          />
                        </IconWrap>
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
                        <FieldLabel htmlFor="category" className={labelClass}>
                          Category
                        </FieldLabel>
                        <IconWrap icon={Tag}>
                          <Select
                            value={field.value}
                            onValueChange={(v) => field.onChange(v ?? "")}
                          >
                            <SelectTrigger
                              id="category"
                              aria-invalid={fieldState.invalid}
                              className={`${inputClass} h-12! w-full`}
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                              {categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {getCategoryMeta(c).emoji} {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </IconWrap>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>

              <div className="border-t-2 border-dashed border-cyan-100" />

              {/* Trip details */}
              <div className="space-y-5">
                <SectionTitle
                  step={2}
                  title="Trip details"
                  hint="Price, length and when it leaves"
                  tone="from-orange-500 to-amber-400"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Controller
                    control={form.control}
                    name="price"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="price" className={labelClass}>
                          Price (USD)
                        </FieldLabel>
                        <IconWrap icon={DollarSign}>
                          <Input
                            {...field}
                            id="price"
                            type="number"
                            min={0}
                            placeholder="e.g., 1299"
                            aria-invalid={fieldState.invalid}
                            className={inputClass}
                          />
                        </IconWrap>
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
                        <FieldLabel htmlFor="duration" className={labelClass}>
                          Duration
                        </FieldLabel>
                        <IconWrap icon={Clock}>
                          <Input
                            {...field}
                            id="duration"
                            placeholder="e.g., 7 Days/6 Nights"
                            aria-invalid={fieldState.invalid}
                            className={inputClass}
                          />
                        </IconWrap>
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
                      <FieldLabel
                        htmlFor="departureDate"
                        className={labelClass}
                      >
                        Departure Date
                      </FieldLabel>
                      <IconWrap icon={CalendarDays}>
                        <Input
                          {...field}
                          id="departureDate"
                          type="date"
                          aria-invalid={fieldState.invalid}
                          className={inputClass}
                        />
                      </IconWrap>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="border-t-2 border-dashed border-cyan-100" />

              {/* Media & description */}
              <div className="space-y-5">
                <SectionTitle
                  step={3}
                  title="Media & description"
                  hint="Make it look irresistible"
                  tone="from-amber-400 to-yellow-400"
                />

                <Controller
                  control={form.control}
                  name="imageUrl"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="imageUrl" className={labelClass}>
                        Image URL
                      </FieldLabel>
                      <IconWrap icon={ImageIcon}>
                        <Input
                          {...field}
                          id="imageUrl"
                          placeholder="https://example.com/image.jpg"
                          aria-invalid={fieldState.invalid}
                          className={inputClass}
                        />
                      </IconWrap>
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <p className="text-xs font-medium text-slate-400">
                          Paste a direct image link. It shows up in the live
                          preview.
                        </p>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="description" className={labelClass}>
                        Description
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Describe the travel experience..."
                        aria-invalid={fieldState.invalid}
                        className={textareaClass}
                      />
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                        <span
                          className={`shrink-0 text-xs font-bold ${
                            values.description.length >= 20
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }`}
                        >
                          {values.description.length} / 20 min
                        </span>
                      </div>
                    </Field>
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse items-stretch justify-end gap-3 border-t-2 border-dashed border-cyan-100 pt-6 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-rose-50 hover:text-rose-600 hover:ring-rose-200 disabled:pointer-events-none disabled:opacity-50"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105 disabled:pointer-events-none disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  {isSubmitting ? "Saving..." : "Add Travel Package"}
                </button>
              </div>
            </FieldGroup>
          </form>
        </div>

        {/* ---------- Live preview ---------- */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            <Eye className="size-4 text-cyan-600" />
            Live preview
          </p>

          <article className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-cyan-200/60 ring-1 ring-cyan-100">
            <div className="relative h-52 overflow-hidden bg-linear-to-br from-cyan-300 via-sky-300 to-orange-300">
              {showImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={values.imageUrl}
                  alt="Destination preview"
                  className="size-full object-cover"
                  onError={() => setFailedUrl(values.imageUrl)}
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 text-white/90">
                  <ImageIcon className="size-10" />
                  <span className="text-xs font-bold">
                    {isValidImageUrl
                      ? "We couldn't load that image"
                      : "Your photo appears here"}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent" />

              {meta && (
                <span
                  className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-md ${meta.chip}`}
                >
                  {meta.emoji} {values.category}
                </span>
              )}

              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                <MapPin className="size-3.5 text-orange-500" />
                {values.country || "Country"}
              </span>

              <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 shadow-sm">
                <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-base font-extrabold text-transparent">
                  ${previewPrice}
                </span>
                <span className="ml-1 text-[11px] font-semibold text-slate-500">
                  / person
                </span>
              </span>
            </div>

            <div className="p-5">
              <h3 className="line-clamp-1 text-xl font-extrabold tracking-tight text-slate-900">
                {values.name || "Destination name"}
              </h3>
              <p className="mt-2 line-clamp-3 min-h-18 text-sm font-medium leading-6 text-slate-500">
                {values.description ||
                  "Your description will show here as you type."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t-2 border-dashed border-cyan-100 pt-4">
                <span className="flex items-center gap-2 rounded-full bg-cyan-50 py-1 pl-1 pr-3 text-xs font-bold text-slate-700">
                  <span className="flex size-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                    <Clock className="size-3.5" />
                  </span>
                  {values.duration || "Duration"}
                </span>
                <span className="flex items-center gap-2 rounded-full bg-orange-50 py-1 pl-1 pr-3 text-xs font-bold text-slate-700">
                  <span className="flex size-6 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <CalendarDays className="size-3.5" />
                  </span>
                  {previewDate}
                </span>
              </div>
            </div>
          </article>

          <p className="mt-3 text-xs font-medium text-slate-400">
            This is how your card will look on the destinations page.
          </p>
        </aside>
      </div>
    </main>
  );
}
