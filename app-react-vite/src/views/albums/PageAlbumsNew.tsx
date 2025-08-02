import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import { createAlbum, getArtists } from "../../server";
import ErrorMessage from "../../ui/ErrorMessage";
import type { Artist, formAlbum } from "../../schema";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
export default function PageAlbumsNew() {
  const [artists,setArtist] = useState<Artist[]>([])

  useEffect(()=>{
    async function fetchArtists(){
      const response = await getArtists()
      if(!response?.result || !response.valoration ){
        toast.error(response?.message)
        return
      }
      setArtist(response.data)
      
    }
    fetchArtists()
  })
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      release_year: 0,
      artist_id: 0,
    },
  });

  const handleCreateAlbum = async (formData: formAlbum) => {
    console.log(formData);
    
    const response = await createAlbum(formData);
    if (!response?.result || !response?.valoration) {
      toast.error(response?.message);
      return;
    }
    toast.success(response.message);
    reset();
  };

  return (
    <>
      <Heading>New Album</Heading>
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form
          action=""
          className="space-y-5"
          onSubmit={handleSubmit(handleCreateAlbum)}
        >
          <div className="space-y-2">
            <label className="text-slate-800" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full p-3 bg-slate-100"
              placeholder="Title Album"
              {...register("title", {
                required: "The title is required",
                min: 1,
              })}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-slate-800" htmlFor="release_year">
              Release Year
            </label>
            <input
              type="text"
              id="country"
              className="block w-full p-3 bg-slate-100"
              placeholder="Release Year"
              {...register("release_year", {
                required: "The year is required",
                valueAsNumber: true,
                minLength: {
                  value: 1,
                  message: "The year most be numeric",
                },
              })}
            />
            {errors.release_year && (
              <ErrorMessage>{errors.release_year.message}</ErrorMessage>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-slate-800" htmlFor="artist_id">
              Artist
            </label>
            <select  id="artist_id" {...register("artist_id",{
              required:"The artist is required",
               valueAsNumber: true,
                minLength: {
                  value: 1,
                  message: "The id most be numeric",
                },
            })} className="block w-full p-3 bg-slate-100">
              <option value="">-- Choose Artist --</option>
              {artists.map((artist)=>(
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
         
            {errors.artist_id && (
              <ErrorMessage>{errors.artist_id.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
            value="Add Artist"
          />
        </form>
      </div>
    </>
  );
}
