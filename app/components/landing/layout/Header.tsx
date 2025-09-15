"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ProfileIcon from '../../utils/ProfileIcon'

const Header = () => {
  const router = useRouter()
  const session = useSession()
  const status = session.status

  return (
    <header className='w-full py-3'>
      <div className='flex items-center justify-between max-w-[1200px] mx-auto'>
        <h1 className='text-xl font-black text-black tracking'>AsistenKata</h1>
        <div className='flex items-center gap-5 ml-20'>
          <a href="#hero" className='font-[400] text-sm'>Home</a>
          <a href="#product" className='font-[400] text-sm'>Product</a>
          <a href="#pricing" className='font-[400] text-sm'>Pricing</a>
          <a href="#testimonials" className='font-[400] text-sm'>Testimonials</a>
        </div>
        <div className='flex items-center gap-3'>
          {status === "authenticated" ? (
            <ProfileIcon imageProfile={session.data?.user?.image as string}/>
          ): (
            <button onClick = { () => router.push("/signin") } className = 'font-[400] text-sm bg-transparent text-black py-1.5 px-4 cursor-pointer'>Sign In</button>
          )}
        <button className='font-[400] text-sm bg-gradient-to-r from-blue-500 to-blue-400 text-white py-1.5 px-4 rounded-md text-md'>Get a Demo</button>
      </div>
    </div>
    </header >
  )
}

export default Header