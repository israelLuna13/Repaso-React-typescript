import { Link } from "react-router-dom";
import Heading from "../../ui/Heading";
import { TablePlayListSong } from "../../components/TablePlayListSong";
import { useEffect, useState } from "react";
import type { PlayListSong } from "../../schema";
import { getSongsPlayList } from "../../server";
import { toast } from "react-toastify";

export function PagePlayListSong(){
    const [playListSongs,setPlayListSongs]= useState<PlayListSong[]>([])
    useEffect(()=>{
        async function fetchPlayListSongs(){
            try {
                const data = await getSongsPlayList()
                if(!data?.valoration || !data.result){
                    toast.error(data?.message)
                    return
                }
                setPlayListSongs(data.data)
            } catch (error) {
                console.log(error);
                toast.error('Hubo un error al obtener la informacion')
            }
        }
         fetchPlayListSongs()
    },[])
    return(
        <>
        <Heading>Playlist songs</Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
            <Link to={"/playlists-songs/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer" >
            Add song to playlist
            </Link>
        </div>
        <TablePlayListSong playListSongs={playListSongs} />
        </>
    )
}