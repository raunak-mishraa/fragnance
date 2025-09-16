'use client';

import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/slices/userSlice";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data.user));
        } else {
          dispatch(clearUser());
        }
      } catch {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}