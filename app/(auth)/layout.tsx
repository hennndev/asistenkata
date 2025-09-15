import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='min-h-screen flex items-center justify-center pt-10 pb-5'>
      {children}
    </main>
  )
}

export default AuthLayout