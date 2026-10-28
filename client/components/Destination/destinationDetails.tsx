"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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

/* Label + input pair used throughout the edit form */
function Field({
  id,
  label,
  className = "",
  ...props
}: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </Label>
      <Input
        id={id}
        required
        className="h-10 border-slate-200 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
        {...props}
      />
    </div>
  );
}

export default function DestinationDetails({ data }: DestinationDetailsProps) {
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
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Could not update destination. Please try again.");
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

      window.location.href = "/destinations";
    } catch (error) {
      console.error(error);
      alert("Could not delete destination. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!destination) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Destination not found
          </h2>
          <p className="mt-2 text-slate-500">
            We {"couldn't"} find the destination {"you're"} looking for.
          </p>
        </div>
      </section>
    );
  }

  const departureDate = new Date(
    `${destination.departureDate}T00:00:00`,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          {/* Back button */}
          <Button
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-emerald-50"
          >
            <Link className="flex items-center" href="/destinations">
              <ArrowLeft className="mr-2 size-4" />
              All Destinations
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            {/* Edit dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  className="cursor-pointer border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
              </DialogTrigger>

              <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
                <DialogHeader className="px-6 pb-4 pt-6 text-left">
                  <DialogTitle className="text-xl font-semibold text-slate-900">
                    Edit destination
                  </DialogTitle>
                  <DialogDescription className="text-slate-500">
                    Update the details of {destination.name}.
                  </DialogDescription>
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
                      <Field
                        id="category"
                        label="Category"
                        {...bind("category")}
                      />
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
                        className="text-sm font-medium text-slate-700"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        required
                        rows={4}
                        className="resize-none border-slate-200 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                        {...bind("description")}
                      />
                    </div>
                  </div>

                  <DialogFooter className="shrink-0 gap-2 border-t border-slate-200 px-6 py-4 mb-4 bg-gray-200">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setEditOpen(false)}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-emerald-600 p-4 cursor-pointer text-white hover:bg-emerald-700"
                    >
                      {isSaving ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Delete confirmation dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogTrigger>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this destination?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {destination.name} will be removed permanently. This
                    can&apos;t be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    className="cursor-pointer"
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
                    className="bg-red-600 cursor-pointer text-white hover:bg-red-700"
                  >
                    {isDeleting ? "Deleting..." : "Delete destination"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {/* Destination image */}
        <div className="relative h-64 overflow-hidden rounded-2xl sm:h-96 lg:h-[460px]">
          <Image
            width={400}
            height={400}
            src={destination.imageUrl}
            alt={destination.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

          <div className="absolute bottom-0 left-0 p-5 sm:p-8 lg:p-10">
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              {destination.category}
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {destination.name}
            </h1>

            <p className="mt-2 flex items-center gap-2 text-sm text-white/90 sm:text-base">
              <span aria-hidden="true">📍</span>
              {destination.country}
            </p>
          </div>
        </div>

        {/* Details and booking card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Main information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              About this destination
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              {destination.description}
            </p>

            <div className="my-7 border-t border-slate-200" />

            <h3 className="text-lg font-semibold text-slate-900">
              Trip information
            </h3>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Duration</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {destination.duration}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Departure date</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {departureDate}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Destination</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {destination.country}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Category</p>
                <p className="mt-1 font-semibold text-emerald-600">
                  {destination.category}
                </p>
              </div>
            </div>
          </section>

          {/* Price card */}
          <PriceCard data={data} />
        </div>
      </div>
    </main>
  );
}
