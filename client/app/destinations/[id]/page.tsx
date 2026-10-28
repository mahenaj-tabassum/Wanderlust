import DestinationDetails from "@/components/Destination/DestinationDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

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

interface DestinationResponse {
  message: string;
  data: Destination;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Server side token retrieve
  const tokenResponse = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-destinations/${id}`,
    {
      headers: {
        Authorization: `Bearer ${tokenResponse?.token}`,
      },
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch destination: ${res.status} ${res.statusText}`,
    );
  }

  const response: DestinationResponse = await res.json();

  return <DestinationDetails data={response} />;
}
