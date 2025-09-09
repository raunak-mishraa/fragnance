"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "@/slices/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      dispatch(clearUser()); // Clear redux auth state
      setOpen(false);
      window.location.href = '/'; // Redirect to homepage
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white py-2">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-black">
            <img src="/assets/images/logo.jpg" alt="Logo" className="h-12 w-12 object-contain rounded" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-light text-black transition hover:text-black hover:bg-[#F5F5F5] hover:rounded-md px-3 py-2.5">Shop</Link>
            <Link href="/user/orders" className="text-sm font-light text-black transition hover:text-black hover:bg-[#F5F5F5] hover:rounded-md px-3 py-2.5">Orders</Link>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-10 items-center gap-1 rounded-md px-3 text-gray-700 transition hover:bg-gray-100"
          >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <g clipPath="url(#clip0)">
                <circle cx="7" cy="7" r="5.5" />
                <circle cx="7" cy="5.5" r="1.75" />
                <path
                  d="M10.5 11L10.412 10.89A4.37 4.37 0 0 0 7 9.25a4.37 4.37 0 0 0-3.412 1.64L3.5 11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <path fill="#fff" d="M0 0h14v14H0z" />
                </clipPath>
              </defs>
            </svg>
            <ChevronDown className="h-4 w-4" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <Link
                href="/user/profile"
                className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
