import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/lib/provider";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";

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
      <body className={`${inter.className}`}>
          <Toaster position="bottom-right" />
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  );
}