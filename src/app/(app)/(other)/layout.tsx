import type { Metadata } from "next";
import Header from "./product/Header";
import Footer from "@/components/Footer";
import ServiceHighlights from "@/components/ServiceHighlights";
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
      <Header />
      <main className="min-h-screen pt-36">
        {children}
      </main>
      <ServiceHighlights color="bg-[var(--main-color)]" />
      <Footer />
    </>
  );
}