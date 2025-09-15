"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'

interface PropsTypes {
  children: React.ReactNode
}

const NextAuthProvider = ({children}: PropsTypes) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default NextAuthProvider