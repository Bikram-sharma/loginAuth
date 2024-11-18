"use client";
import Link from 'next/link';

export default function UserProfile({params}) {
  

 

  return (
    <div className="flex justify-center bg-gray-500 h-screen text-5xl text-white flex-wrap">
      <Link href="/login">
        <span className="font-mono bg-orange-500 p-2 rounded-xl absolute end-5 top-5 text-xl">Logout</span>
      </Link>
      <h1 className="w-full flex justify-center items-center font-mono">
        Welcome,{params.id}
      </h1>
      <h1 className="w-full text-center">
        Its Your Profile
      </h1>
    </div>
  );
}
