"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  LogOut,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  const [active, setActive] = useState("products");
  const router = useRouter();

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "products", label: "Products", icon: Package },
    { key: "orders", label: "Orders", icon: ShoppingCart },
    { key: "customers", label: "Customers", icon: Users },
    { key: "queries", label: "User Queries", icon: Users },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (res.ok) {
        // Clear any client state if needed
        router.push("/"); // redirect to home or login page
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };
  return (
    <aside className="w-64 h-screen bg-[#111111] flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 text-xl font-semibold text-gray-100 flex items-center border-b border-gray-800">
        <Image src="/assets/images/logo.png" alt="Logo" width={32} height={32} className="inline-block mr-2 w-8 h-8 object-contain" />
        Admin Pannel
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 px-3 mt-2">
        {menuItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => { setActive(key); setTab(key); }}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors text-white"
                )}
              />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />
      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-5 w-5 text-white" />
          Logout
        </button>
      </div>

    </aside>
  );
}
