import { Link } from "react-router-dom";
import Heading from "../../ui/Heading";
import { useState } from "react";
import type { formCreateAccount } from "../../schema";
import { toast } from "react-toastify";
import { createAccount } from "../../server";

export function CreateAccountView() {
    const [formLogin,setFormLogin]=useState<formCreateAccount>({
        name:'',
        email:'',
        password:''
    })
    const handleSubmit= async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!formLogin.email.trim() || !formLogin.password.trim() || !formLogin.name.trim()) {
            toast.error("The inputs are required")
            return
        }       
        const response = await createAccount(formLogin)
        if(!response?.result || !response.valoration){
             toast.error(response?.message)
          return
        }
        toast.success(response.message)
        setFormLogin({email:'',password:'' ,name:''})

    }
  return (
    <>
      <Heading>Login and Manage your Music</Heading>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form action="" onSubmit={handleSubmit}>

               <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl text-bold"
            >
              Name
            </label>
            <input
                value={formLogin.name}
              type="text"
              placeholder="Your Name"
              className="border w-full p-3 mt-3 bg-gray-50 block rounded-xl"
              onChange={(e)=>setFormLogin((prev)=>({...prev, name:e.target.value}))}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl text-bold"
            >
              Email
            </label>
            <input
                value={formLogin.email}
              type="email"
              placeholder="Email register"
              className="border w-full p-3 mt-3 bg-gray-50 block rounded-xl"
              onChange={(e)=>setFormLogin((prev)=>({...prev, email:e.target.value}))}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl text-bold"
            >
              Password
            </label>
            <input
            value={formLogin.password}
              type="password"
              placeholder="******"
              className="border w-full p-3 mt-3 bg-gray-50 block rounded-xl"
              onChange={(e)=>setFormLogin((prev)=>({...prev,password:e.target.value}))}
            />
          </div>
          <input
            type="submit"
            value="Create account"
            className="bg-blue-700 w-full rounded-xl p-3 text-white uppercase px-10 font-bold mt-5 hover:cursor-pointer hover:bg-blue-900 md:w-auto"
          />
        </form>
        <div>
          <nav className="mt-10 lg:flex lg:justify-between">
            <Link to={"/"} className="block text-center my-5 text-gray-500">
              Do not have a account? Create one
            </Link>
            <Link
              className="block text-center my-5 text-gray-500"
              to="/forgot-password"
            >
              Forgot password
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
