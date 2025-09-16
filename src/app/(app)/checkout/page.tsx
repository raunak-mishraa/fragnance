"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";

export default function CheckoutPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const [shippingId, setShippingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const total = items.reduce(
    (acc, item: any) => acc + Number(item.perfume.mrp) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // keep auth cookie
        body: JSON.stringify({ shippingId }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // ✅ Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      <ul className="space-y-2">
        {items.map((item: any) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.perfume.flavor} (x{item.quantity})
            </span>
            <span>₹{Number(item.perfume.mrp) * item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p className="font-semibold">Total: ₹{total}</p>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter Shipping Address ID"
          value={shippingId}
          onChange={(e) => setShippingId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>

      {message && <p className="mt-3 text-red-600">{message}</p>}
    </div>
  );
}
