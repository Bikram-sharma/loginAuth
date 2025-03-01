'use client'
import { useState, useEffect} from "react"
import React from 'react'
import Link from "next/link"
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ForgotPassword() {

const router = useRouter()
const [email, setEmail] = useState('');
const [buttonDisable, setButtonDisable] = useState(true);
const [loading, setLoading] = useState(false)


useEffect(()=>{
if(email.length){
    setButtonDisable(false)

}else{
    setButtonDisable(true)
}

},[email]);

const onSend = async ()=>{

    if(email){

 
        
         try {
        setLoading(true);
        const response = await axios.post("/api/users/forgotpassword",{email});
        toast.success(response.data.message);
        // router.push(response.data.redirect);
  
        
      
      } catch (error) {
        toast.error(error.response.data.error ?? error.message , {
        })
      } finally {
       setTimeout(setLoading(false), 1000) 
      }
    }else{
        toast.error('Enter your email')
    }
   
}


   


  return (
    <div className="flex  flex-col justify-center items-center bg-[url(https://images.pexels.com/photos/30716164/pexels-photo-30716164/free-photo-of-contemplative-solitude-under-sunset-by-a-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-cover h-screen text-white">
        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration:4000,
        }}
      />
      <div className="flex flex-col justify-center items-center h-5/6 w-full md:w-1/2 lg:w-2/6 bg-white/10 backdrop-blur-sm rounded ">
      <fieldset className=" w-5/6 h-5/6 border-2 rounded flex justify-center items-center flex-col text-2xl italic font-mono p-5 text-white ">
         <legend>{loading ? 'loading' : 'Enter your Email'}</legend>
          <input type="email"  onChange={(e)=> setEmail(e.target.value.toLowerCase())} placeholder="Email" className="rounded mb-5 text-base px-2 py-1 bg-transparent border-b-2 focus:outline-none"/>
          <button  type="submit"  onClick={onSend}className={`rounded bg-transparent  my-5 py-2 font-bold text-xl w-1/2 ${ buttonDisable? "shadow-none cursor-not-allowed" : "shadow-2xl shadow-white shadow-inner"}`}>Send</button>

         </fieldset>
         <Link href="/login" className="font-xl p-2 italic font-mono">Click here to Login</Link>

      </div>
         
    </div>
  )
}
