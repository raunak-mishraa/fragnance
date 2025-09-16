"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalAmount: string;
  payment: { amount: number; status: string } | null;
  shipping: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  } | null;
  items: {
    perfume: { flavor: string; images: { url: string }[] };
    quantity: number;
    price: string;
  }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/orders");
      if (res.ok) {
        setOrders(await res.json());
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Order History</h1>

      {orders.length === 0 ? (
        <p>No past orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between">
                <h2 className="font-semibold">Order #{order.id}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="mt-1">Status: <span className="font-medium">{order.status}</span></p>
              <p className="mt-1">Total: ₹{order.totalAmount}</p>
              <p className="mt-1">Payment: {order.payment?.status}</p>

              {order.shipping && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>📍 {order.shipping.street}, {order.shipping.city}</p>
                  <p>{order.shipping.state} - {order.shipping.zip}, {order.shipping.country}</p>
                </div>
              )}

              <div className="mt-3 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <img
                      src={item.perfume.images[0]?.url}
                      alt={item.perfume.flavor}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{item.perfume.flavor} (x{item.quantity})</span>
                    <span className="ml-auto">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
