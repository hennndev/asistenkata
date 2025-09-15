"use client"
import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import googleIcon from "../../../assets/icons/google.svg"
import { signIn } from 'next-auth/react'

interface PropsTypes {
  isLoading: boolean
}

const GoogleButton = ({ isLoading }: PropsTypes) => {

  const loginGoogle = async () => {
    await signIn("google", {
      callbackUrl: "/"
    })
  }

  return (
    <button type='button' disabled={isLoading} className={clsx("flex items-center justify-center py-2 px-4 bg-transparent text-black rounded-md font-semibold border border-gray-300", isLoading ? "cursor-default" : "cursor-pointer")} onClick={loginGoogle}>
      <Image src={googleIcon} alt="google-icon" className='size-5 mr-3' />
      Sign In with Google
    </button>
  )
}

export default GoogleButton