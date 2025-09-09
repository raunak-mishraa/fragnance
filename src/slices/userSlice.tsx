import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface UserState {
  id: string | null;
  name: string;
  email: string;
  addresses: Address[];
}

const initialState: UserState = {
  id: null,
  name: "",
  email: "",
  addresses: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.addresses = [];
    },
  },
});

export const { setUser, updateName, addAddress, removeAddress, setAddresses, clearUser } = userSlice.actions;
export default userSlice.reducer;
