"use client"
import React, { useState } from 'react'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

interface PropsTypes {
  imageProfile: string
}

const ProfileIcon = ({ imageProfile }: PropsTypes) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    signOut()
    setOpenMenu(false)
  }
  return (
    <div className='relative rounded-full w-7 h-7 bg-gray-500 cursor-pointer' onClick={() => setOpenMenu(!openMenu)}>
      <Image
        src={imageProfile || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
        alt="profile-image"
        fill
        sizes="96px"
        className='w-full h-full rounded-full' />

      {openMenu ? (
        <div className='absolute w-[200px] bg-gray-50 rounded-md top-10 right-0 border border-gray-200'>
          <div className='flex flex-col p-1'>
            <button className='flex items-center text-left px-2 py-1.5 hover:bg-gray-100 cursor-pointer rounded-md text-sm'>
              My Profile
            </button>
            <div className='border-b border-gray-200 my-1'></div>
            <button className='flex items-center justify-between text-left px-2 py-1.5 hover:bg-gray-100 cursor-pointer rounded-md text-sm' onClick={handleLogout}>
              Sign Out
              <LogOutIcon className='size-4 text-black' />
            </button>
          </div>
        </div>
      ) : <></>}
    </div>
  )
}

export default ProfileIcon