import { Link } from "react-router-dom"
import Heading from "../../ui/Heading"
import TablePlayHistory from "../../components/TablePlayHistory"
import { useEffect, useState } from "react"
import type { PlayHistory } from "../../schema"
import { getPlayHistory } from "../../server"
import { toast } from "react-toastify"

export default function PagePlayHistory() {
        const [playhistory,setPlayhistory]=useState<PlayHistory[]>([])
        useEffect(()=>{
                async function fetchPlayHistory(){
                    const data = await getPlayHistory()
                    
                    if(!data?.valoration || !data.result){
                                    toast.error(data?.message)
                                    return
                                }
                    setPlayhistory(data.data)
                }
                fetchPlayHistory()
            
            },[])
  return (
     <>
        <Heading>Albums List </Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <Link to={"/play-history/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
          Create PlayList
          </Link>
        </div>
        <TablePlayHistory playhistory={playhistory}/>
        </>
  )
}
