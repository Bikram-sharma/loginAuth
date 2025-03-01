"use client";
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {


  const router = useRouter()
  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [flag, setFlag] = React.useState(true);
  const [passwordViwer, setPasswordViewer] = React.useState(<GoEyeClosed />);
  const [loading, setLoading] = React.useState(false)

  const onLogin = async () => {

    try {

      if (user.email || user.password) {

        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        toast.success(`Login Successfully`);
        router.push("/profile");

      } else {
        toast.error("Email and password are required")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error ?? error.message)
    } finally {
      setLoading(false)
    }


  }

  const viewPassword = () => {

    setFlag(!flag)

  }

  React.useEffect(() => {

    if (flag) {
      setPasswordViewer(<GoEyeClosed />)
    } else {
      setPasswordViewer(<GoEye />)
    }

    if (user.email && user.password) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }

  }, [flag, user])

  return (
    <div className="flex  flex-col justify-center items-center bg-[url(https://images.pexels.com/photos/30716164/pexels-photo-30716164/free-photo-of-contemplative-solitude-under-sunset-by-a-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-cover h-screen text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
        }}
      />
      <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm  h-5/6 w-full md:w-1/2 lg:w-2/6 ">
        <fieldset className=" border-2 rounded h-5/6 w-5/6 flex justify-center items-center flex-col text-3xl italic font-mono p-5">
          <legend>{loading ? "processing" : "Login"}</legend>
          <section className='flex justify-center  flex-col w-5/6'>
            <label className="text-lg p-1 ">Email</label>
            <input type="email" value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value.toLowerCase() })} placeholder="Email" className="rounded mb-5 text-base px-2 py-1 bg-transparent border-b-2 focus:outline-none" />
            <label className="text-lg p-1">Password</label>
            <span className="flex w-full border-b-2 outline-none focus:shadow-2xl focus:shadow-white mb-10">
              <input type={flag ? "password" : "text"} onChange={(e) => setuser({ ...user, password: e.target.value })} placeholder="Password" className="rounded text-base px-2 py-1 bg-transparent shadow-inner outline-none w-full" />
              <span className="text-xl w-1/6  hover:cursor-pointer" onClick={viewPassword}>{passwordViwer}</span>
            </span>
            <button onClick={onLogin} type="submit" className={`rounded bg-transparent  my-5 py-2 font-bold text-xl  w-full ${buttonDisable ? "shadow-none cursor-not-allowed" : "shadow-2xl shadow-white shadow-inner"}`}>Login</button>
          </section>
          <Link href="/forgotpassword" className="px-2 italic font-mono text-base">Forgot Password?</Link>

        </fieldset>

        <Link href="/signup" className="font-xl p-2 italic font-mono">Click here to Signup</Link>

      </div>


    </div>
  )
}
