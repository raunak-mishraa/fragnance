import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await fetch("/api/cart", { credentials: "include" });
  return res.json();
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ perfumeId, quantity }: { perfumeId: string; quantity?: number }) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ perfumeId, quantity }),
    });
    return { perfumeId, quantity };
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/update",
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ itemId, quantity }),
    });
    return { itemId, quantity };
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async ({ itemId }: { itemId: string }) => {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ itemId }),
    });
    return itemId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as any[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.id === action.payload.itemId);
        if (item) item.quantity = action.payload.quantity;
      });
  },
});

export default cartSlice.reducer;
