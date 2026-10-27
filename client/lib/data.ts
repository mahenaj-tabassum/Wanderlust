import {
  Globe2,
  ShieldCheck,
  Headset,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type Destination = {
  _id: string;
  name: string;
  country: string;
  price: number;
  days: number;
  imageUrl: string;
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
