import DestinationDetails from "@/components/Destination/destinationDetails";
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

  const res = await fetch(`http://localhost:5000/all-destinations/${id}`);

  if (!res.ok) {
    notFound();
  }

  const response: DestinationResponse = await res.json();

  return <DestinationDetails data={response} />;
}
