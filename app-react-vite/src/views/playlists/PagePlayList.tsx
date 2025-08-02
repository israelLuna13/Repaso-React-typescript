import { useEffect, useState } from "react"
import type { PlayList } from "../../schema"
import { getPlaylist } from "../../server"
import { toast } from "react-toastify"
import Heading from "../../ui/Heading"
import { Link } from "react-router-dom"
import TablePlayLists from "../../components/TablePlayLists"

export default function PagePlayList() {

  const [playlists,setPlaylist]=useState<PlayList[]>([])
    
        useEffect(()=>{
            async function fetchPlayLists(){
                const data = await getPlaylist()
                
                if(!data?.valoration || !data.result){
                                toast.error(data?.message)
                                return
                            }
                setPlaylist(data.data)
            }
            fetchPlayLists()
        
        },[])
  return (
   <>
        <Heading>Albums List </Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <Link to={"/playlists/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
          Create PlayList
          </Link>
        </div>
        <TablePlayLists playlists={playlists}/>
        </>
  )
}
