import {
  Home,
  Mail,
  MapPin,
  PlusCircle,
  Ticket,
  type LucideIcon,
} from "lucide-react";

export type NavLink = { label: string; href: string; icon: LucideIcon };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Destinations", href: "/destinations", icon: MapPin },
  { label: "Add Destination", href: "/addPackage", icon: PlusCircle },
  { label: "My Booking", href: "/my-booking", icon: Ticket },
  { label: "Contact", href: "/contact", icon: Mail },
];

// "/" only matches exactly; other links also match their sub-routes
export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
