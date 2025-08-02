import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import ErrorMessage from "../../ui/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { formPlayList, User } from "../../schema";
import { playListSchemaCreate } from "../../schema/schemas";
import { createPlayList, getUsers } from "../../server";
export default function PagePlayListNew() {
      const [users,setUsers]=useState<User[]>([])

       const {
          register,
          reset,
          handleSubmit,
          formState: { errors },
        } = useForm<formPlayList>({
          resolver: zodResolver(playListSchemaCreate),
        });

        const handlePlayListCreate = async (data: formPlayList) => {
            
            const response = await createPlayList(data);
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
                 fetchUsers()
          },[])
    
  return (
   <>
        <div>Álbumes:</div>
        <Heading>New Playlist</Heading>
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit(handlePlayListCreate)}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-slate-800">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Example: One More Ligth"
                className="block w-full p-3 bg-slate-100"
                {...register("name")}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>
  

  
            <div className="space-y-2">
              <label htmlFor="user_id" className="text-slate-800">
                Album
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
            <input
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
              value="Create"
            />
          </form>
        </div>
      </>
  )
}
