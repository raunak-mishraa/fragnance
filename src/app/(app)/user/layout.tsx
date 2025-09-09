import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserNavbar from "@/components/user/UserNavbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "House of Perfumes",
  description: "Discover exquisite perfumes and fragrances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserNavbar />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}