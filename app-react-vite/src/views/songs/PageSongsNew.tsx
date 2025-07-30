import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import ErrorMessage from "../../ui/ErrorMessage";
import type { formSong } from "../../schema";
import { songSchemaCreate } from "../../schema/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function PageSongsNew(){
    const {register,reset,handleSubmit, formState:{errors}} = useForm<formSong>({
       resolver:zodResolver(songSchemaCreate)
    })

    const handleSongCreate=async(data:formSong)=>{

        console.log("Valid data",data);
        reset()
        
    }
    return(
        <>
        <Heading>New Song</Heading>
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form className="space-y-5" onSubmit={handleSubmit(handleSongCreate)}>
                <div className="space-y-2">
                    <label htmlFor="title" className="text-slate-800">Title</label>
                    <input type="text" id="title" placeholder="Example: One More Ligth" className="block w-full p-3 bg-slate-100"
                    {...register("title")}
                     />
                      {errors.title && (
                                   <ErrorMessage>{errors.title.message}</ErrorMessage>
                                 )}
                    
                </div>


                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-slate-800">Duration</label>
                    <input type="number" id="duration"  className="block w-full p-3 bg-slate-100"
                    {...register("duration")}
                     />
                      {errors.duration && (
                                   <ErrorMessage>{errors.duration.message}</ErrorMessage>
                                 )}
                    
                </div>


 <div className="space-y-2">
                    <label htmlFor="album_id" className="text-slate-800">Album</label>
                    <input type="number" id="album_id"  className="block w-full p-3 bg-slate-100"
                    {...register("album_id")}
                     />
                      {errors.album_id && (
                                   <ErrorMessage>{errors.album_id.message}</ErrorMessage>
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