import { useState } from "react";
import Heading from "../../ui/Heading";
import { createArtist } from "../../server";
import { toast } from "react-toastify";
import type { formArtist } from "../../schema";

export default function PageArtistsNew() {
    const [formArtist,setFormArtist]=useState<formArtist>({
        name:'',
        country:''
    })
    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(!formArtist.country.trim() || !formArtist.name.trim()){
            toast.error('The inputs are required');
            return
        }

        const response = await createArtist(formArtist)
        if(!response?.result || !response.valoration){
          toast.error(response?.message)
          return
        }
        toast.success(response?.message)
        setFormArtist({name:'',country:''})

    }
  return (
   <>
   <Heading>
    New Artist
   </Heading>
   <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
    <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
            <label className="text-slate-800" htmlFor="name">Name</label>
            <input type="text" id="name" name="name"           value={formArtist.name}
 className="block w-full p-3 bg-slate-100"
          placeholder="Artist Name"
          onChange={(e)=>setFormArtist((prev)=>({...prev,name:e.target.value}))}/>
        </div>
         <div className="space-y-2">
            <label className="text-slate-800" htmlFor="country">Country</label>
            <input type="text" id="country" name="country" className="block w-full p-3 bg-slate-100"
          placeholder="Country"
          value={formArtist.country}
           onChange={(e)=>setFormArtist((prev)=>({...prev,country:e.target.value}))}/>
        </div>

          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
            value="Add Artist"
          />
    </form>
   </div>
   </>
  )
}
