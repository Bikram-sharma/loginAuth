"use client";
import axios from "axios";
import React, {useEffect, useState} from "react";
import toast ,{Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState({})
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

     const userDetail  = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data)
     }

useEffect(()=>{
    userDetail() 
},[data.username])
 

    return (
        <div className="flex min-h-screen bg-red-500">
          <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration:4000,
        }}
      />

      <nav className="bg-blue-400 flex w-full h-2/6 justify-between items-center">
      <h1 className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-2/6"> Welcome to Your Profile <span className="border-b-4 border-green-500 rounded">{data.username}</span></h1>
            {/* <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500 h-2/6">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data.username}`}>{data.username}
            </Link>}</h2>
        <hr />
        
        <button
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-2/6"
        >GetUser Details</button> */}
        <button
        onClick={logout}
        className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-2/6"
        >Logout</button>
      </nav>
            


            </div>
    )
}
