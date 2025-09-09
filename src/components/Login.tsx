"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
  
// Define validation schema with Zod
const loginSchema = z.object({
  email: z.email('Please enter a valid email address')
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      console.log('Form submitted:', data)
      const response = await axios.post('/api/send-otp', { email: data.email })
      const result = response.data
      console.log(result)
      if (result.success) {
        router.push('/otp-verification?email=' + data.email)
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Failed to submit form'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6">
            <Image 
              src="/assets/images/logo.png" 
              alt="House of Perfumes Logo" 
              width={80} 
              height={80} 
              className="mx-auto h-12 object-contain w-fit"
              priority
            />
          </div>

          {/* Sign in heading */}
          <h1 className="text-2xl font-medium text-black mb-3">
            Sign in
          </h1>

          {/* Description text */}
          <p className="text-gray-600 text-sm mb-8">
            Enter your email and we'll send you a verification code
          </p>

          {/* Error message */}
          {errors.root && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
              {errors.root.message}
            </div>
          )}

          {/* Email input form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <div className="mb-6">
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Continue button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Continue'}
            </button>
          </form>

          {/* Privacy policy link */}
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
