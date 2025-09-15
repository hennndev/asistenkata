"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"

interface ForgotPasswordFormtTypes {
  email: string
}

const ForgotPasswordForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: {errors} } = useForm<ForgotPasswordFormtTypes>({
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async (values: ForgotPasswordFormtTypes) => {
    console.log(values)
  }

  return (
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
          })}/>
        {errors.email ? (
          <p className='text-sm text-red-600'>{errors.email.message}</p>
        ) : <></>}
      </div>
      <button type='submit' className='py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md cursor-pointer font-semibold'>Submit</button>
      <p className='text-center text-black text-[15px] -mt-2'>Already have an account? <span className='underline cursor-pointer' onClick={() => router.push("/signin")}>Click Here</span></p>
    </form>
  )
}

export default ForgotPasswordForm