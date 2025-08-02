import { useEffect, useState } from "react"
import type { formPlayListSong, PlayList, Song } from "../../schema"
import { addSongPlaylist, getPlaylist, getSongs } from "../../server"
import { toast } from "react-toastify"
import Heading from "../../ui/Heading"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {  playListSongsSchemaCreate } from "../../schema/schemas"
import ErrorMessage from "../../ui/ErrorMessage"


export default function PagePlayListSongNew() {
  const [songs,setSongs]=useState<Song[]>([])
  const [playlists,setPlaylist]=useState<PlayList[]>([])
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<formPlayListSong>({
    resolver: zodResolver(playListSongsSchemaCreate),
  });
  useEffect(()=>{
    async function fetchSongs(){
        const data = await getSongs()
        if(!data?.result || !data.valoration){
            toast.error(data?.message)
                    return
        }
        setSongs(data.data)
    }

     async function fetchPlayLists(){
        const data = await getPlaylist()
        if(!data?.result || !data.valoration){
            toast.error(data?.message)
                    return
        }
        setPlaylist(data.data)
    }

    fetchPlayLists()
    fetchSongs()

  },[])
  const handleSongCreate = async (data: formPlayListSong) => {
    console.log(data);
    
    const response = await addSongPlaylist(data);
    if (!response?.result || !response.valoration) {
      toast.error(response?.message);
    }
    toast.success(response?.message);
    reset();
  };
  return (
  <>
        <div>Álbumes:</div>
        <Heading>New Song</Heading>
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit(handleSongCreate)}>
        
            <div className="space-y-2">
              <label htmlFor="playlist_id" className="text-slate-800">
                PlayList
              </label>
                <select  id="playlist_id"{...register("playlist_id")} className="block w-full p-3 bg-slate-100">
                <option value="">-- Choose PlayList</option>
  
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
              {errors.playlist_id && (
                <ErrorMessage>{errors.playlist_id.message}</ErrorMessage>
              )}
            </div>

               <div className="space-y-2">
              <label htmlFor="song_id" className="text-slate-800">
                Song
              </label>
                <select  id="song_id"{...register("song_id")} className="block w-full p-3 bg-slate-100">
                <option value="">-- Choose PlayList</option>
  
                {songs.map((song) => (
                  <option key={song.id} value={song.id}>
                    {song.title}
                  </option>
                ))}
              </select>
              {errors.song_id && (
                <ErrorMessage>{errors.song_id.message}</ErrorMessage>
              )}
            </div>
            <input
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
              value="Add Song"
            />
          </form>
        </div>
      </>
  )
}
