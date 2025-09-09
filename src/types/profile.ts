// types/profile.ts
export type Address = {
  id: number;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Profile = {
  name: string;
  email: string;
  addresses: Address[];
};
