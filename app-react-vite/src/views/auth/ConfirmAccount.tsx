import { useState } from "react";
import Heading from "../../ui/Heading";
import type { formConfirmAccount } from "../../schema";
import { toast } from "react-toastify";
import { confirmAccount } from "../../server";

export default function ConfirmAccount() {
    const [token,setToken]= useState<formConfirmAccount>({
        token:''
    })
    const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!token.token.trim()){
            toast.error("The token is required")
            return
        }
        const response = await confirmAccount(token)
        if(!response?.result || !response.valoration){
            toast.error(response?.message)
            return
        }
        toast.success(response.message)
        setToken({token:''})
    }
  return (
    <>
    <Heading>
        Confirm Account
    </Heading>
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl text-bold" htmlFor="">Token</label>
                <input type="text"className="border w-full p-3 mt-3 bg-gray-50 block rounded-xl" placeholder="122345" value={token.token} onChange={(e)=>setToken({token:e.target.value})}/>
            </div>
            <input type="submit" value={"Confirm account"} className="bg-blue-700 w-full rounded-xl p-3 text-white uppercase px-10 font-bold mt-5 hover:cursor-pointer hover:bg-blue-900 md:w-auto" 
            />
        </form>
    </div>
      
    </>
  )
}
