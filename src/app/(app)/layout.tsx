import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AnnouncementBar from "@/app/components/AnnouncementBar";

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
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <AnnouncementBar />
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  );
}