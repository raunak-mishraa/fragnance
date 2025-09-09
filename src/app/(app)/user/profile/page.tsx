"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { RootState } from "@/store/store";
import { setUser, updateName, addAddress, removeAddress } from "@/slices/userSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { name, email, addresses, id } = useSelector((state: RootState) => state.user);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(name);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressType: "Home", // default to Home
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Fetch profile once
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user/profile", { withCredentials: true });
        dispatch(setUser(res.data));
        setNewName(res.data.name || "");
      } catch (err) {
        console.error(err);
      }
    };
    if (!id) fetchProfile();
  }, [dispatch, id]);

  const handleSaveName = async () => {
    try {
      await axios.patch("/api/user/profile", { name: newName }, { withCredentials: true });
      dispatch(updateName(newName));
      setEditingName(false);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setNewAddress({
      addressType: "Home",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    setIsModalOpen(true);
  };

  const handleSaveAddress = async () => {
    try {
      const res = await axios.post("/api/user/addresses", newAddress, { withCredentials: true });
      dispatch(addAddress(res.data));
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAddress = async (addrId: string) => {
    try {
      await axios.delete(`/api/user/addresses/${addrId}`, { withCredentials: true });
      dispatch(removeAddress(addrId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            {editingName ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0065C7] focus:outline-none"
                />
                <button onClick={handleSaveName} className="px-4 py-2 bg-[#0065C7] text-white rounded-lg">
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                <span className="text-gray-800">{name || "Not set"}</span>
                <button onClick={() => setEditingName(true)} className="text-[#0065C7] hover:text-black transition">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">{email}</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Addresses</h2>
            <button onClick={openModal} className="flex items-center gap-1 text-[#0065C7] hover:text-black transition">
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>

          {/* No address */}
          {addresses.length === 0 ? (
            <div className="p-4 bg-gray-50 rounded-lg text-gray-500 text-sm flex items-center gap-2">
              <span>No addresses added</span>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{addr.fullName || "Unnamed Address"}</p>
                    <p className="text-gray-600 text-sm">
                      {addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:text-red-700 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black transition">
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4">Add Address</h3>
            <div className="space-y-3">
              <select
                value={newAddress.addressType}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" placeholder="Phone" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg" />
                <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="ZIP" value={newAddress.zip} onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg" />
                <input type="text" placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={handleSaveAddress} className="px-4 py-2 bg-[#0065C7] text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
