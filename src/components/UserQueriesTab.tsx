"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, User, Clock, CheckCircle, XCircle } from "lucide-react";

interface UserQuery {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "resolved";
  createdAt: string;
}

export default function UserQueriesTab() {
  const [queries, setQueries] = useState<UserQuery[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "resolved">("all");

  // Fetch queries from your API
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("/api/user-queries");
        if (response.ok) {
          const data = await response.json();
          setQueries(data);
        }
      } catch (error) {
        console.error("Error fetching user queries:", error);
      }
    };

    fetchQueries();
  }, []);

  const filteredQueries = queries.filter(query => {
    const fullName = `${query.firstName} ${query.lastName || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || query.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const markAsResolved = async (id: string) => {
    try {
      const response = await fetch("/api/user-queries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "resolved" }),
      });

      if (response.ok) {
        setQueries(queries.map(q => (q.id === id ? { ...q, status: "resolved" } : q)));
      }
    } catch (error) {
      console.error("Error updating query status:", error);
    }
  };

  const deleteQuery = async (id: string) => {
    try {
      const response = await fetch(`/api/user-queries?id=${id}`, { method: "DELETE" });

      if (response.ok) {
        setQueries(queries.filter(q => q.id !== id));
      }
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Queries</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search queries..."
              className="pl-10 w-64 rounded-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-none px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-lg">
        {filteredQueries.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-sm font-medium text-gray-900">No queries found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {queries.length === 0
                ? "No user queries have been submitted yet."
                : "Try adjusting your search or filter."}
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredQueries.map((query) => (
              <div key={query.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium">{query.subject}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          query.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {query.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {query.firstName} {query.lastName || ""}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {query.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(query.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-700">{query.message}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {query.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsResolved(query.id)}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark Resolved
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteQuery(query.id)}
                      className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
