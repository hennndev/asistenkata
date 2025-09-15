import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm'
import React from 'react'

const ForgotPassword = () => {
  return (
    <section className='flex flex-col w-[500px] max-w-[500px] shadow-md rounded-md p-10'>
      <h2 className='font-bold text-3xl'>AsistenKata</h2>
      <div className='flex flex-col gap-4 mt-12'>
        <div className='flex flex-col gap-1'>
          <p className='text-black text-2xl font-bold'>Forgot Password</p>
          <p>Enter your email address below.</p>
        </div>
        <ForgotPasswordForm/>
      </div>
    </section>
  )
}

export default ForgotPassword