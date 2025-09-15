"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import GoogleButton from './GoogleButton'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { SignupValuesTypes } from '@/types/auth'
import LoadingButton from '../shared/LoadingButton'
import { signup } from '@/app/lib/actions/auth/signup'

type SignupFormTypes = SignupValuesTypes & {
  passwordConfirmation: string
}

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormTypes>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    }
  })
  const router = useRouter()

  const onSubmit = async (values: SignupFormTypes) => {
    setIsLoading(true)
    setIsError(null)
    try {
      const response = await signup({
        name: values.name,
        email: values.email,
        password: values.password
      })
      if(response?.error) {
        throw new Error(response?.error)
      }
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      })
      
      router.push("/")
    } catch (error: any) {
      setIsError(error.message)
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
          <label htmlFor="name" className='font-[400] text-black text-[15px]'>Name</label>
          <input
            type="text"
            id='name'
            placeholder='Enter your name'
            className='text-[15px] py-2 px-3 border-b border-[#ccc] outline-none'
            {...register("name", {
              required: "This field is required"
            })} />
          {errors.name ? (
            <p className='text-red-600 text-sm'>{errors.name.message}</p>
          ) : <></>}
        </div>
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
        <div className='flex flex-col gap-2'>
          <label htmlFor="passwordConfirmation" className='font-[400] text-black text-[15px]'>Password Confirmation</label>
          <input
            type="password"
            id='passwordConfirmation'
            placeholder='Enter your password confirmation'
            className='text-[15px] py-2 px-3 border-b border-[#ccc] outline-none'
            {...register("passwordConfirmation", {
              required: "This field is required",
              minLength: {
                value: 7,
                message: "Minimum password confirmation lenght is 7 characters"
              },
              validate: (value) => {
                return watch("password") === value || "Password confirmation not match with password"
              }
            })} />
          {errors.passwordConfirmation ? (
            <p className='text-red-600 text-sm'>{errors.passwordConfirmation.message}</p>
          ) : <></>}
        </div>
        {isLoading ? <LoadingButton/> : (
          <button type='submit' className='py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md cursor-pointer font-semibold'>Sign Up</button>
        )}
        <GoogleButton isLoading={isLoading} />
      </form>
    </>
  )
}

export default SignupForm