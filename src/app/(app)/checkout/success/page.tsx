"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-3 text-gray-700">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {orderId && (
        <p className="mt-2 text-gray-600">
          Your Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}

      <Link
        href="/"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
