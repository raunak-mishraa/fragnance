"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/authSlice"; // ✅ Redux slice

// Zod schemas
const emailSchema = z.email("Please enter a valid email address");
const otpSchema = z
  .string()
  .length(6, "OTP must be exactly 6 digits")
  .regex(/^\d+$/, "OTP must contain only numbers");

export default function AdminLogin() {
  const [step, setStep] = useState<number>(1); // 1: email entry, 2: OTP verification
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    general?: string;
  }>({});
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  // Step 1: send OTP
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      emailSchema.parse(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ email: error.issues[0].message });
        setIsLoading(false);
        return;
      }
    }

    try {
      console.log("Sending OTP to:", email);
      const response = await axios.post("/api/admin/send-otp", { email });
      if (response.data.success) {
        setStep(2);
      } else {
        setErrors({ general: response.data.error || "Failed to send OTP" });
      }
    } catch (error: any) {
      setErrors({
        general:
          error.response?.data?.error ||
          "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Step 2: verify OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    const enteredOtp = otp.join("");

    try {
      otpSchema.parse(enteredOtp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ otp: error.issues[0].message });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post("/api/admin/verify-otp", {
        email,
        code: enteredOtp,
      });

      console.log("OTP verification response:", response.data);
      if (response.data.accessToken) {
         dispatch(setUser(response.data));
        router.push("/admin/dashboard");
      } else {
        setErrors({ general: "Authentication failed" });
      }
    } catch (error: any) {
      setErrors({
        general:
          error.response?.data?.error ||
          "Verification failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Secure access for authorized personnel
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {errors.general}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Admin Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="Enter your admin email"
                  required
                  className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#000000] text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Enter the 6-digit OTP sent to{" "}
                  <span className="font-medium">{email}</span>
                </p>

                <div className="flex justify-between space-x-3 mb-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-xl border ${errors.otp ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent`}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="text-sm text-red-600 text-center">
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp(["", "", "", "", "", ""]);
                    setErrors({});
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isLoading || otp.some((d) => d === "")}
                  className="flex-1 bg-[#000000] text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] disabled:opacity-50 transition-colors"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              For security reasons, access is restricted to authorized
              administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
