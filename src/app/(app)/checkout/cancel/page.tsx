"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CancelPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600">❌ Payment Cancelled</h1>
      <p className="mt-3 text-gray-700">
        Your payment was cancelled. Don’t worry, you can try again.
      </p>

      {orderId && (
        <p className="mt-2 text-gray-600">
          Pending Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}

      <Link
        href="/checkout"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Retry Checkout
      </Link>
    </div>
  );
}
