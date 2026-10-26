import {
  Globe2,
  ShieldCheck,
  Headset,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type Destination = {
  id: number;
  name: string;
  country: string;
  price: number;
  rating: number;
  days: number;
  image: string;
  tag: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Bali Paradise",
    country: "Indonesia",
    price: 1290,
    rating: 4.9,
    days: 7,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Santorini Escape",
    country: "Greece",
    price: 1850,
    rating: 4.8,
    days: 6,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    tag: "Romantic",
  },
  {
    id: 3,
    name: "Maldives Retreat",
    country: "Maldives",
    price: 2400,
    rating: 5.0,
    days: 5,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    tag: "Luxury",
  },
  {
    id: 4,
    name: "Kyoto Journey",
    country: "Japan",
    price: 1650,
    rating: 4.7,
    days: 8,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    tag: "Culture",
  },
  {
    id: 5,
    name: "Swiss Alps",
    country: "Switzerland",
    price: 2100,
    rating: 4.9,
    days: 6,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    tag: "Adventure",
  },
  {
    id: 6,
    name: "Cox's Bazar",
    country: "Bangladesh",
    price: 320,
    rating: 4.6,
    days: 3,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    tag: "Beach",
  },
];

export const features: Feature[] = [
  {
    title: "Safe & Secure",
    description: "Verified partners and protected payments on every booking.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Guides",
    description: "Local professionals who know every hidden gem.",
    icon: Globe2,
  },
  {
    title: "Best Price",
    description: "Transparent pricing with no surprise fees.",
    icon: Wallet,
  },
  {
    title: "24/7 Support",
    description: "Real people ready to help, any time zone.",
    icon: Headset,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Photographer",
    quote:
      "The whole trip felt effortless. Every detail was handled and the guides were fantastic.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    quote:
      "Best booking experience I've had. Clear pricing and amazing destinations.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Amina Rahman",
    role: "Travel Blogger",
    quote:
      "Wanderlust helped me discover places I'd never have found on my own.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];
