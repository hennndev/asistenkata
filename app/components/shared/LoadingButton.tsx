import React from 'react'
import { BeatLoader, SyncLoader } from 'react-spinners'

const LoadingButton = () => {
  return (
    <button type='button' disabled className='py-2.5 px-4 bg-gray-300 text-black rounded-md cursor-pointer font-semibold flex items-center justify-center'>
      <BeatLoader size={5} className='mr-3'/>
      Please Wait
    </button>
  )
}

export default LoadingButton