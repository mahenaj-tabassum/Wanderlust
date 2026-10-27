"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileContent, { ProfileSkeleton } from "./profileContent";
import { authClient } from "@/lib/auth-client";

const ProfileComponent = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Send signed-out visitors to the sign-in page
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <ProfileSkeleton />;
  }

  return <ProfileContent user={session.user} />;
};

export default ProfileComponent;
