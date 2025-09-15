import React from 'react'
import Header from '@/app/components/landing/layout/Header'
import Hero from './components/landing/sections/Hero'
import { getServerSession } from 'next-auth'
import { authOptions } from './lib/config/authOptions'

const Home = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <>
      <Header/>
      <main className='w-full mt-40'>
        <Hero/>
      </main>
    </>
  )
}

export default Home