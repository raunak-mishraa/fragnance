import type { Metadata } from "next";
import UserNavbar from "@/components/user/UserNavbar";

export const metadata: Metadata = {
  title: "User Dashboard - ScentSkape",
  description: "Manage your profile and orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserNavbar />
      <main className="min-h-screen max-w-6xl mx-auto pt-10">
        {children}
      </main>
    </>
  );
}