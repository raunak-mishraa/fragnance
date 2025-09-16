"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart, updateQuantity } from "@/slices/cartSlice";
import { RootState, AppDispatch } from "@/store/store";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div>
                <p>{item.perfume.flavor}</p>
                <p className="text-sm text-gray-500">{item.perfume.brand?.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        itemId: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        itemId: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart({ itemId: item.id }))}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
