import { useEffect, useState } from "react"
import { getArtists } from "../server"
import { type Artist } from "../schema"
import Heading from "../ui/Heading"
import { Link, useNavigate } from "react-router-dom"
import TableArtists from "../components/TableArtists"
import { toast } from "react-toastify"
import useAuth from "../hook/useAuth"

export  function PageArtists(){

    const navigate = useNavigate()

    const {auth,load}=useAuth()
     const [artists,setArtist]=useState<Artist[]>([])

    useEffect(()=>{
        if (load) return; // espera a que termine la validación del token//colocar spinner

        if (auth.length === 0 && !load) navigate("/");
        
        async function fetchArtists() {
            const data = await getArtists();

            if (!data?.valoration || !data.result) {
            toast.error(data?.message);
            return;
            }
            setArtist(data.data);
        }
        fetchArtists();
            
        
    
    },[auth,load,navigate])
    return(
        <>
        <Heading>Artists List </Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <Link to={"/artists/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
          Create Artists
          </Link>
        </div>
        <TableArtists artists={artists}/>
        </>
    )
}