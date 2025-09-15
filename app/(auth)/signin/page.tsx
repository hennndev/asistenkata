import React from 'react'
import SigninForm from '@/app/components/auth/SigninForm'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/config/authOptions'

const Signin = async () => {
  return (
    <section className='flex flex-col w-[500px] max-w-[500px] shadow-md rounded-md p-10'>
      <h2 className='font-bold text-3xl'>AsistenKata</h2>
      <div className='flex flex-col gap-4 mt-12'>
        <div className='flex flex-col gap-1'>
          <p className='text-black text-2xl font-bold'>Welcome Back!</p>
          <p>Don't have an account? <Link href={"/signup"} className='underline'>Create your new account now</Link>. It's free and take less a minutes</p>
        </div>
        <SigninForm/>
      </div>
    </section>
  )
}

export default Signin