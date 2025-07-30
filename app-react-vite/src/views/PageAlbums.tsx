import { useEffect, useState } from "react"
import { getAlbums} from "../server"
import { type Album } from "../schema"
import Heading from "../ui/Heading"
import { Link } from "react-router-dom"
import TableAlbums from "../components/TableAlbums"
import { toast } from "react-toastify"

export  function PageAlbums(){


     const [albums,setAlbums]=useState<Album[]>([])

    useEffect(()=>{
        async function fetchAlbums(){
            const data = await getAlbums()
            
            if(!data?.valoration || !data.result){
                            toast.error(data?.message)
                            return
                        }
            setAlbums(data.data)
        }
        fetchAlbums()
    
    },[])
    return(
        <>
        <Heading>Albums List </Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <Link to={"/albums/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
          Create Album
          </Link>
        </div>
        <TableAlbums albums={albums}/>
        </>
    )
}