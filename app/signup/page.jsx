"use client";
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import validator from "validator";




export default function SignupPage() {





  const router = useRouter();
  const [user, setuser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false)
  const [flag, setFlag] = React.useState(true)



  const onSignup = async () => {

    

   const validMail = validator.isEmail(user.email);
   const validPassword = validator.isStrongPassword(user.password)
    
   if(user.email && user.password && user.username){

    if(validMail && validPassword){

      try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          toast.success(`Singup Successfully`);
          router.push("/login")
          }catch (error) {
              console.log(error)
              toast.error(error.response.data.message ?? error.message)
          }finally {
             setLoading(false)
          }

     }else{
        toast.error(validMail ? "password must contain 8 characters, at least one lowercase letter, one uppercase letter, one number, and one symbol" : "invalid email",
           {style:{color:"red", textAlign:"justify"
           }})
     }

    }else{
      toast.error("Please fill all the fields first!")
    }

       

    



  }



  const viewPassword = () => {

    setFlag(!flag)

  }

  React.useEffect(() => {

    if (user.email && user.password && user.username) {
      setButtonDisabled(false)

    } else {
      setButtonDisabled(true)
    }
  }, [flag, user])



  return (

    <div className="flex  flex-col justify-center items-center bg-gray-700 h-screen text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration:4000,
        }}
        
      />
      <div className="flex flex-col justify-center items-center bg-gray-700 h-5/6 w-2/6 rounded">
        <fieldset className=" border-2 rounded border-gray-400 h-5/6 w-5/6 flex justify-center items-center flex-col text-3xl italic font-mono p-5 text-white">
          <legend>{loading ? "Processing..." : "Signup"}</legend>

          <section className="flex justify-center  flex-col  w-5/6">
            <label className="mt-3 text-lg p-1">Username</label>
            <input id="username" value={user.username} onChange={(e) => setuser({ ...user, username: e.target.value })} type="text" placeholder="Username" required className="rounded mb-5 text-base px-2 py-1 bg-transparent border-b-2 outline-none required" />
            <label className="text-lg p-1">Email</label>
            <input id="email" value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} type="email" placeholder="Email" required className="rounded mb-5 text-base px-2 py-1 bg-transparent border-b-2 outline-none required" />
            <label className="text-lg p-1">Password</label>
            <span className="flex w-full border-b-2 outline-none focus:shadow-2xl focus:shadow-white mb-10">
              <input id="password" value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} type={flag ? "password" : "text"} placeholder="Password" required className="rounded  text-base px-2 py-1 bg-transparent outline-none w-full required" />
              <span className="text-xl w-1/6  hover:cursor-pointer" onClick={viewPassword}>{flag? <GoEyeClosed /> : <GoEye />}</span>
            </span>

            <button onClick={onSignup} type="submit" className={`rounded bg-transparent px-5 py-2 mb-5 font-bold text-xl  ${buttonDisabled ? "shadow-none cursor-not-allowed" : "shadow-2xl shadow-white shadow-inner "} `}>Signup</button>
          </section>

        </fieldset>

        <Link href="/login" className="font-xl p-2 italic font-mono">Click here to login</Link>


      </div>


    </div>
  )
}
