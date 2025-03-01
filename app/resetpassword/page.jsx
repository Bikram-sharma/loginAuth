"use client"
import toast, {Toaster} from 'react-hot-toast';
import React, {useEffect, useState} from 'react'
import validator from 'validator';
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/navigation';


export default function ResetPassword() {


  const router = useRouter()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')

  const validNewPassword = validator.isStrongPassword(newPassword);

  useEffect(()=>{

   
    if(newPassword && confirmPassword){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[newPassword, confirmPassword])

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
}, []);

   

  const handeler = async ()=>{


    if(newPassword && confirmPassword){

      try {
         if(!validNewPassword){
            throw new Error("password must contain 8 characters, at least one lowercase letter, one uppercase letter, one number, and one symbol")
          }else if(newPassword != confirmPassword){
            throw new Error(' Confirm Password did not match!')
          }

          const response = await axios.post('/api/users/resetpassword',{token, newPassword});
          toast.success(response.data.message);
          router(response.data.redirect)

        



            
} catch (error) {

  toast.error(error.message)
  
}
 
    }else{
      toast.error('fill both fields')
    }

    
  }

  return (
    <div className="flex  flex-col justify-center items-center bg-[url(https://images.pexels.com/photos/30716164/pexels-photo-30716164/free-photo-of-contemplative-solitude-under-sunset-by-a-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-cover h-screen text-white">
        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
        duration:4000,
        style: {
          textAlign: "justify",
        },
        
        }}
      />
      <div className='w-2/6 h-5/6 flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm rounded'>
      <fieldset className=" border-2 rounded h-5/6 w-5/6 flex justify-center items-center flex-col text-2xl italic font-mono p-5">
         <legend>{loading? 'loading' : 'Enter New Password'}</legend>
          <input type="password" onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter New Password" className="rounded mb-5 text-base px-2 py-1 bg-transparent border-b-2 focus:outline-none"/>
          <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="rounded mt-5 text-base px-2 py-1 bg-transparent border-b-2 focus:outline-none"/>
          <button  type="submit" onClick={handeler} className={`rounded bg-transparent  my-5 py-2 font-bold text-xl w-1/2 ${ buttonDisabled ? "shadow-none cursor-not-allowed" : "shadow-2xl shadow-white shadow-inner"}`}>Update</button>

         </fieldset>
         <Link href="/login" className="font-xl p-2 italic font-mono">Click here to Login</Link>

      </div>
         
    </div>
  )
}
