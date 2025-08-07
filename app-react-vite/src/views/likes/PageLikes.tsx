import { Link } from "react-router-dom";
import Heading from "../../ui/Heading";
import { useEffect, useState } from "react";
import type { Like } from "../../schema";
import { getLikes } from "../../server";
import { toast } from "react-toastify";
import TableLikes from "../../components/TableLikes";

export default function PageLikes() {
      const [likes,setLikes]=useState<Like[]>([])
       useEffect(()=>{
                  async function fetchPlayLists(){
                      const data = await getLikes()
                      
                      if(!data?.valoration || !data.result){
                                      toast.error(data?.message)
                                      return
                                  }
                      setLikes(data.data)
                  }
                  fetchPlayLists()
              },[])
    
  return (
   <>
    <Heading>Likes List </Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <Link to={"/likes/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
          Add Like
          </Link>
        </div>
        <TableLikes likes={likes}/>

   </>
  )
}
