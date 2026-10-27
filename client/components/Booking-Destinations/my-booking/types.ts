export interface Destination {
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

// Booking reuses the Destination fields it needs, so the types stay in sync
export interface Booking extends Pick<
  Destination,
  "country" | "category" | "price" | "duration" | "departureDate" | "imageUrl"
> {
  _id: string;
  userId: string;
  userName: string;
  email: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  bookingDate: string;
}

export type Tab = "upcoming" | "past";
