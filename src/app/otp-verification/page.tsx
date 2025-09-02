"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input on backspace if current is empty
      const prevInput = e.currentTarget.previousSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await axios.post('/api/verify-otp', { email, otp: otpCode });
      console.log(data)
      toast.success('Email verified successfully!');
      router.push('/profile');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle the resend cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    
    if (!email) {
      toast.error('Email is required');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/resend-otp', { email });
        toast.success(data.message || 'OTP resent successfully!');
        setResendCooldown(60); // 60 seconds cooldown
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFEFEF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8  shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-black/80">
            We've sent a 6-digit verification code to {email || 'your email'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                className="w-12 h-12 border-2 border-[#DEDEDE] bg-white rounded-md text-center text-xl font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                disabled={isLoading}
              />
            ))}
          </div>

          <div className="text-center text-sm text-black/80">
            {resendCooldown > 0 ? (
              <p>Resend OTP in {formatTime(resendCooldown)}</p>
            ) : (
              <>
                Didn't receive a code?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-medium text-black hover:text-black/70 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Resend OTP'}
                </button>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
