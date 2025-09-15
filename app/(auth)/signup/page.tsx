import React from 'react'
import Link from 'next/link'
import SignupForm from '@/app/components/auth/SignupForm'

const Signup = () => {
  return (
    <section className='flex flex-col w-[500px] max-w-[500px] shadow-md rounded-md p-10'>
      <h2 className='font-bold text-3xl'>AsistenKata</h2>
      <div className='flex flex-col gap-4 mt-12'>
        <div className='flex flex-col gap-1'>
          <p className='text-black text-2xl font-bold'>Hi, Welcome.</p>
          <p>Already have an account? <Link href={"/signin"} className='underline'>Sign In now</Link>.</p>
        </div>
        <SignupForm />
      </div>
    </section>
  )
}

export default Signup