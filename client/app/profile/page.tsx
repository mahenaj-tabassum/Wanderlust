import type { Metadata } from "next";
import ProfileComponent from "@/components/Profile/profileComponent";

export const metadata: Metadata = {
  title: "My profile | Wanderlust",
};

const ProfilePage = () => {
  return <ProfileComponent />;
};

export default ProfilePage;
