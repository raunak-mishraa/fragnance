import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Providers } from "@/lib/provider";
import "./globals.css";
const instrument = Instrument_Sans({ subsets: ["latin-ext"] });
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ScentSkape - Perfume & Fragrance Store",
  description: "Discover exquisite perfumes and fragrances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrument.className}`}>
          <Toaster position="bottom-right" />
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  );
}