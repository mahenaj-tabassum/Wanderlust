"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Compass,
  Loader2,
  MapPin,
  Pencil,
  Tag,
  Trash2,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // npx shadcn@latest add label
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  categoryList,
  getCategoryMeta,
} from "@/components/Destination/category-meta";
import PriceCard from "../Booking-Destinations/priceCard";
import { authClient } from "@/lib/auth-client";

interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

interface DestinationDetailsProps {
  data: {
    message: string;
    data: Destination;
  };
}

const categories = categoryList.filter((c) => c !== "All");

const fieldClass =
  "h-11 rounded-2xl border-0 bg-cyan-50/70 px-4 text-sm font-semibold text-slate-800 transition-colors placeholder:font-medium placeholder:text-slate-400 hover:bg-cyan-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-400";

/* Label + input pair used throughout the edit form */
function Field({
  id,
  label,
  className = "",
  ...props
}: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={id} className="text-sm font-bold text-slate-700">
        {label}
      </Label>
      <Input id={id} required className={fieldClass} {...props} />
    </div>
  );
}

const pillButton =
  "inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

export default function DestinationDetails({ data }: DestinationDetailsProps) {
  const router = useRouter();
  const destination = data.data;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: destination.name,
    country: destination.country,
    category: destination.category,
    price: String(destination.price),
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  });

  // Keeps each input to one line: <Field {...bind("name")} />
  const bind = (key: keyof typeof formData) => ({
    value: formData[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [key]: e.target.value }),
  });

  const getAuthHeaders = async () => {
    const { data, error } = await authClient.token();
    if (error || !data?.token) throw new Error("Not authenticated");
    return { Authorization: `Bearer ${data.token}` };
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all-destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(await getAuthHeaders()),
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update destination");
      }

      setEditOpen(false);
      toast.success("Destination updated!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not update destination. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all-destinations/${destination._id}`,
        {
          method: "DELETE",
          headers: await getAuthHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete destination");
      }

      toast.success("Destination deleted.");
      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete destination. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!destination) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-linear-to-b from-cyan-50/60 to-white px-4">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl shadow-cyan-200/50 ring-1 ring-cyan-100">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Destination not found
          </h2>
          <p className="mt-2 font-medium text-slate-500">
            We {"couldn't"} find the destination {"you're"} looking for.
          </p>
          <Link
            href="/destinations"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-300/60"
          >
            <ArrowLeft className="size-4" />
            All Destinations
          </Link>
        </div>
      </section>
    );
  }

  const meta = getCategoryMeta(destination.category);

  const departureDate = new Date(
    `${destination.departureDate}T00:00:00`,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tripInfo: {
    icon: LucideIcon;
    label: string;
    value: string;
    tone: string;
  }[] = [
    {
      icon: Clock,
      label: "Duration",
      value: destination.duration,
      tone: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: CalendarDays,
      label: "Departure date",
      value: departureDate,
      tone: "bg-orange-100 text-orange-500",
    },
    {
      icon: MapPin,
      label: "Destination",
      value: destination.country,
      tone: "bg-amber-100 text-amber-600",
    },
    {
      icon: Tag,
      label: "Category",
      value: `${meta.emoji} ${destination.category}`,
      tone: "bg-rose-100 text-rose-500",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className={`${pillButton} group bg-white text-cyan-700 shadow-sm ring-1 ring-cyan-200 hover:bg-cyan-500 hover:text-white hover:ring-cyan-500`}
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All Destinations
          </Link>

          <div className="flex items-center gap-2">
            {/* Edit dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger
                className={`${pillButton} bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-cyan-50 hover:text-cyan-700 hover:ring-cyan-300`}
              >
                <Pencil className="size-4" />
                Edit
              </DialogTrigger>

              <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden rounded-3xl border-0 p-0 shadow-2xl sm:max-w-lg">
                <div className="h-1.5 shrink-0 bg-linear-to-r from-cyan-400 via-amber-300 to-orange-400" />

                <DialogHeader className="flex-row items-center gap-4 px-6 pb-4 pt-6 text-left">
                  <span className="flex size-12 shrink-0 rotate-3 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-cyan-300/60">
                    <Pencil className="size-5" />
                  </span>
                  <div>
                    <DialogTitle className="text-xl font-extrabold text-slate-900">
                      Edit destination
                    </DialogTitle>
                    <DialogDescription className="font-medium text-slate-500">
                      Update the details of {destination.name}.
                    </DialogDescription>
                  </div>
                </DialogHeader>

                <form
                  onSubmit={handleEdit}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-6">
                    <Field
                      id="name"
                      label="Destination name"
                      {...bind("name")}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field
                        id="country"
                        label="Country"
                        {...bind("country")}
                      />

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="category"
                          className="text-sm font-bold text-slate-700"
                        >
                          Category
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(v) =>
                            setFormData({ ...formData, category: v ?? "" })
                          }
                        >
                          <SelectTrigger
                            id="category"
                            className={`${fieldClass} h-11! w-full`}
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
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field
                        id="price"
                        label="Price (USD)"
                        type="number"
                        min="0"
                        {...bind("price")}
                      />
                      <Field
                        id="duration"
                        label="Duration"
                        {...bind("duration")}
                      />
                      <Field
                        id="departureDate"
                        label="Departure"
                        type="date"
                        {...bind("departureDate")}
                      />
                    </div>

                    <Field
                      id="imageUrl"
                      label="Image URL"
                      type="url"
                      {...bind("imageUrl")}
                    />

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="description"
                        className="text-sm font-bold text-slate-700"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        required
                        rows={4}
                        className="resize-none rounded-2xl border-0 bg-cyan-50/70 p-4 text-sm font-medium leading-6 text-slate-800 transition-colors hover:bg-cyan-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-400"
                        {...bind("description")}
                      />
                    </div>
                  </div>

                  <DialogFooter className="shrink-0 flex-row justify-end gap-2 border-t-2 border-dashed border-cyan-100 bg-cyan-50/50 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setEditOpen(false)}
                      className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-70"
                    >
                      {isSaving && <Loader2 className="size-4 animate-spin" />}
                      {isSaving ? "Saving..." : "Save changes"}
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Delete confirmation dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogTrigger
                className={`${pillButton} bg-white text-rose-600 shadow-sm ring-1 ring-rose-200 hover:bg-rose-500 hover:text-white hover:ring-rose-500`}
              >
                <Trash2 className="size-4" />
                Delete
              </AlertDialogTrigger>

              <AlertDialogContent className="rounded-3xl border-0 shadow-2xl">
                <AlertDialogHeader>
                  <span className="mx-auto mb-2 flex size-14 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-300/60 sm:mx-0">
                    <TriangleAlert className="size-7" />
                  </span>
                  <AlertDialogTitle className="text-xl font-extrabold text-slate-900">
                    Delete this destination?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-medium text-slate-500">
                    {destination.name} will be removed permanently. This
                    can&apos;t be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    className="cursor-pointer rounded-full font-bold"
                    disabled={isDeleting}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault();
                      void handleDelete();
                    }}
                    disabled={isDeleting}
                    className="cursor-pointer rounded-full bg-linear-to-r from-rose-500 to-pink-500 font-bold text-white shadow-lg shadow-rose-300/60 hover:brightness-105"
                  >
                    {isDeleting ? "Deleting..." : "Delete destination"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Destination image */}
        <div className="relative h-72 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-cyan-300/50 ring-8 ring-white sm:h-96 lg:h-[460px]">
          <Image
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            src={destination.imageUrl}
            alt={destination.name}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-900/75 via-slate-900/10 to-transparent" />

          <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-md backdrop-blur sm:right-8 sm:top-8">
            <Clock className="size-3.5 text-cyan-600" />
            {destination.duration}
          </span>

          <div className="absolute bottom-0 left-0 p-5 sm:p-8 lg:p-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold shadow-md ${meta.chip}`}
            >
              <span aria-hidden="true">{meta.emoji}</span>
              {destination.category}
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {destination.name}
            </h1>

            <p className="mt-2 flex items-center gap-2 text-sm font-bold text-white/95 sm:text-base">
              <MapPin className="size-4 text-amber-300" />
              {destination.country}
            </p>
          </div>
        </div>

        {/* Details and booking card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main information */}
          <section className="rounded-3xl bg-white p-6 shadow-xl shadow-cyan-100/70 ring-1 ring-cyan-100 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-11 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-cyan-300/60">
                <Compass className="size-5" />
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                About this destination
              </h2>
            </div>

            <p className="mt-5 text-base font-medium leading-7 text-slate-500">
              {destination.description}
            </p>

            <div className="my-7 border-t-2 border-dashed border-cyan-100" />

            <h3 className="text-lg font-extrabold text-slate-900">
              Trip information
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {tripInfo.map(({ icon: Icon, label, value, tone }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-cyan-50/60 p-4 ring-1 ring-cyan-100/70 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {label}
                    </p>
                    <p className="mt-0.5 truncate font-extrabold text-slate-900">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Price card */}
          <PriceCard data={data} />
        </div>
      </div>
    </main>
  );
}
