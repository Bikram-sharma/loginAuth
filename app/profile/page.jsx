"use client";
import axios from "axios";
import Link from "next/link";
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

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data)
    }

    useEffect(()=>{
        getUserDetails()
    },[data.user])

    return (
        <div className="min-h-screen p-5 bg-white">
          <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration:4000,
        }}
      />

      <nav className="bg-blue-500 flex items-center justify-between py-5 px-10 rounded-full">

       <span className="text-xl"> Welcome <span className="underline decoration-green-400 decoration-4">{data.username}</span> to your Profile</span>
        
      <button
        onClick={logout}
        className="bg-blue-600  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
        
     </nav>
         
         
        

       


            </div>
    )
}