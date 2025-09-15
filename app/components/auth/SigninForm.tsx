"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import GoogleButton from './GoogleButton'
import { useRouter } from 'next/navigation'
import LoadingButton from '../shared/LoadingButton'


interface SigninFormTypes {
  email: string
  password: string
}

const LoginForm = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  // end state
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<SigninFormTypes>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: SigninFormTypes) => {
    setIsLoading(true)
    setIsError(null)
    try {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (!response?.ok && response?.error) {
        throw new Error(response.error)
      }
      router.push("/")
    } catch (error: any) {
      setIsError(typeof error?.message === "string" ? error?.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isError ? (
        <div className='bg-red-50 w-full rounded-md p-5'>
          <p className='text-red-600 font-medium'>Error: {isError}</p>
        </div>
      ) : <></>}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='font-[400] text-black text-[15px]'>Email</label>
          <input
            type="email"
            id='email'
            placeholder='Enter your email address'
            className='text-[15px] py-2 px-3 border-b border-[#ccc] outline-none'
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email not valid",
              },
            })} />
          {errors.email ? (
            <p className='text-red-600 text-sm'>{errors.email.message}</p>
          ) : <></>}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className='font-[400] text-black text-[15px]'>Password</label>
          <input
            type="password"
            id='password'
            placeholder='Enter your password'
            className='text-[15px] py-2 px-3 border-b border-[#ccc] outline-none'
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 7,
                message: "Minimum password length is 7 characters"
              }
            })} />
          {errors.password ? (
            <p className='text-red-600 text-sm'>{errors.password.message}</p>
          ) : <></>}
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <button type='submit' className='py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md cursor-pointer font-semibold'>Sign In</button>
        )}
        <GoogleButton isLoading={isLoading}/>
        <p className='text-center text-black text-[15px] -mt-2'>Forgot your password? <span className='underline cursor-pointer' onClick={() => router.push("/forgot-password")}>Click Here</span></p>
      </form>
    </>
  )
}

export default LoginForm