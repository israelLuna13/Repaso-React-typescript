import { useEffect, useState } from "react"
import type { Song } from "../schema"
import { getSongs } from "../server"
import Heading from "../ui/Heading"
import { Link } from "react-router-dom"
import TableSongs from "../components/TableSongs"
import { toast } from "react-toastify"

export function PageSongs(){
    const [songs, setSongs] = useState<Song[]>([])

    useEffect(()=>{
        async function fetchSongs(){
            const data  = await getSongs()
           if(!data?.valoration || !data.result){
                           toast.error(data?.message)
                           return
                       }
            setSongs(data.data)
        }
        fetchSongs()

    },[])
    return(
        <>
        <Heading>
            Songs List
        </Heading>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
            <Link to={"/songs/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
            Create Song
            </Link>
        </div>
        <TableSongs songs={songs}/>
        
        
        </>
    )
}