"use client";

import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-3">
      <div className="relative w-80">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-8" />
      </div>
      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-muted-foreground cursor-pointer" />
        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white cursor-pointer">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
