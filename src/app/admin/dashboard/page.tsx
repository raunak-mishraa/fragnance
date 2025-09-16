"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellIcon, User } from "lucide-react";
import Sidebar from "@/components/sidebar";
import ProductsTab from "@/components/ProductTabs";
import UserQueriesTab from "@/components/UserQueriesTab"; 
export default function AdminDashboard() {
  const [tab, setTab] = useState("products");

  return (
    <div className="flex h-screen">
   
      <Sidebar tab={tab} setTab={setTab} />

      {/* Main Content */}
      <main className="flex-1 bg-white">
        {/* Topbar */}
        <div className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-semibold capitalize">{tab}</h1>
      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-64 rounded-none" />
        <Button variant="ghost"><BellIcon className="h-4 w-4" /></Button>
        <div className="bg-black text-white rounded-full p-3"><User className="h-4 w-4" /></div>
      </div>
    </div>
        {/* Tabs for content */}
        <div className="p-6">
          {tab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <p className="text-muted-foreground">Overview of your store.</p>
            </div>
          )}

          {/* Product Management */}
          {tab === "products" && (
            <ProductsTab />
          )}

          {tab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold">Orders</h2>
              <p className="text-muted-foreground">Manage customer orders</p>
            </div>
          )}

          {tab === "customers" && (
            <div>
              <h2 className="text-2xl font-bold">Customers</h2>
              <p className="text-muted-foreground">Manage your customers</p>
            </div>
          )}

          {tab === "analytics" && (
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-muted-foreground">
                Track sales and performance
              </p>
            </div>
          )}
          {tab === "queries" && (
            <UserQueriesTab />
          )}
        </div>
      </main>
    </div>
  );
}
