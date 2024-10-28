import React from 'react'
import Link from 'next/link'

export default function Profile() {
  return (
    <div className='flex justify-center items-center flex-col bg-gray-500 h-screen text-5xl text-white'>
        <h1>Profile Page</h1>
        <Link href="/login" className='bg-black rounded-xl p-2'>Login to Another Account</Link>
    </div>
  )
}
