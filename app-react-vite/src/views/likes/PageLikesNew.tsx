import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { formLike, Song, User } from "../../schema";
import { likeSchemaCreate } from "../../schema/schemas";
import { useEffect, useState } from "react";
import { addLikeToSong, getSongs, getUsers } from "../../server";
import { toast } from "react-toastify";
import Heading from "../../ui/Heading";
import ErrorMessage from "../../ui/ErrorMessage";

export default function PageLikesNew() {
  const [songs, setSongs] = useState<Song[]>([]);
        const [users,setUsers]=useState<User[]>([])
  

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<formLike>({
    resolver: zodResolver(likeSchemaCreate),
  });

  const handleLikeCreate = async (data: formLike) => {
    const response = await addLikeToSong(data);
    
    if (!response?.result || !response.valoration) {
      toast.error(response?.message);
    }
    toast.success(response?.message);
    
    reset();
  };
    useEffect(()=>{
               async function fetchUsers(){
                const data = await getUsers()
                if(!data?.valoration || !data?.result){
                  toast.error(data?.message)
                  return
                }
                
                setUsers(data.data)
              }
               async function fetchSongs(){
                const data = await getSongs()
                if(!data?.valoration || !data?.result){
                  toast.error(data?.message)
                  return
                }
                
                setSongs(data.data)
              }
                   fetchUsers()
                   fetchSongs()
            },[])
      
  return <>
    <Heading>Add Like</Heading>
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
              <form className="space-y-5" onSubmit={handleSubmit(handleLikeCreate)}>
                <div className="space-y-2">
                  <label htmlFor="user_id" className="text-slate-800">
                    User
                  </label>
                    <select  id="user_id"{...register("user_id")} className="block w-full p-3 bg-slate-100">
                    <option value="">-- Choose User</option>
      
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  {errors.user_id && (
                    <ErrorMessage>{errors.user_id.message}</ErrorMessage>
                  )}
                </div>

                  <div className="space-y-2">
                  <label htmlFor="song_id" className="text-slate-800">
                    User
                  </label>
                    <select  id="song_id"{...register("song_id")} className="block w-full p-3 bg-slate-100">
                    <option value="">-- Choose Song</option>
      
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
                  value="Create"
                />
              </form>
            </div>
  </>;
}
