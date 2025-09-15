import React from 'react'

const Hero = () => {
  return (
    <section className='max-w-[1200px] mx-auto flex items-center justify-center flex-col gap-7'>
      <h1 className='text-center text-[60px] font-bold leading-[75px]'>
        AI-Powered Solutions <br />
        For Writting Assistance
      </h1>
      <p className='font-[400] text-lg text-black max-w-[550px] text-center'>Make your work and acitvity easy with our AI-Powered platform, revolutionizing all of your writing task will efforlessly</p>
      <div className='flex w-[600px]'>
        <input type="text" placeholder='Enter your email address' className='py-2 border border-gray-200 w-[400px] px-6 rounded-l-md outline-none'/>
        <button className='flex-1 py-2 px-6 bg-gradient-to-r rounded-r-md from-blue-500 to-blue-400 text-white'>Sign Up for Free</button>
      </div>
    </section>
  )
}

export default Hero