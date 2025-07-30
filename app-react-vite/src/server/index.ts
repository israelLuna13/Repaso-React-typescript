import z from 'zod'
import { albumApiResponseSchema, artistApiResponseSchema, resposeApi, songApiResponseSchema } from "../schema"
import { albumSchemaCreate, artistSchemaCreate, songSchemaCreate } from "../schema/schemas";

export async function  getArtists():Promise<z.infer<typeof artistApiResponseSchema> | undefined>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/artists`)
    const json = await res.json()
    const result = artistApiResponseSchema.safeParse(json)

    if (!result.success) {
      console.error("Respuesta inválida:", result.error);
      return undefined
    } 
     return result.data
}
export async function createArtist(data:unknown):Promise<z.infer<typeof resposeApi> | undefined>{
  const result = artistSchemaCreate.safeParse(data)
  if(!result.success){
    console.error("Respuesta inválida:", result.error);
      return undefined
  }
   const info_create =await fetch(`${import.meta.env.VITE_API_URL}/artists`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name:result.data.name,
      country:result.data.country
    })
  })
  const info_data= await info_create.json()
   const parsed = resposeApi.safeParse(info_data);
  if (!parsed.success) {
    console.error("Respuesta inválida:", parsed.error);
    return undefined;
  }
  return parsed.data
}
//--------------------------------
export async function createAlbum(data:unknown):Promise<z.infer<typeof resposeApi> | undefined>{

  const result = albumSchemaCreate.safeParse(data)
  if(!result.success){
      
      console.error("Respuesta inválida:", result.error);
      return undefined
  }
  const info_create =await fetch(`${import.meta.env.VITE_API_URL}/albums`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      title:result.data.title,
      release_year:result.data.release_year,
      artist_id:result.data.artist_id
    })
  })
  const info_data= await info_create.json()
   const parsed = resposeApi.safeParse(info_data);
  if (!parsed.success) {
    console.error("Respuesta inválida:", parsed.error);
    return undefined;
  }

  return parsed.data

}
export async function  getAlbums():Promise<z.infer<typeof albumApiResponseSchema> | undefined>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/albums`)
    const json = await res.json()
    const result = albumApiResponseSchema.safeParse(json)

    if (!result.success) {
      console.error("Respuesta inválida:", result.error);
      return undefined
    } 
     return result.data
}
//---------------------------------

export async function getSongs():Promise<z.infer<typeof songApiResponseSchema> | undefined>{
  const res = await fetch(`${import.meta.env.VITE_API_URL}/songs`)
  const json = await res.json()
  const result = songApiResponseSchema.safeParse(json)

  if(!result.success){
    console.error("Respuesta inválida:", result.error);
      return undefined
  }
  return result.data
}

export async function createSong(data:unknown):Promise<z.infer<typeof albumApiResponseSchema> | undefined>{
  const result = songSchemaCreate.safeParse(data)
  if(!result.success){
    console.error("Respuesta inválida:", result.error);
      return undefined
  }

  try {
    const info_create = await fetch(`${import.meta.env.VITE_API_URL}/songs`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        title:result.data.title,
        duration:result.data.duration,
        album_id:result.data.album_id
      })
    })

    const info_data= await info_create.json()
    const parsed = resposeApi.safeParse(info_data)
    if(!parsed.success){
       console.error("Respuesta inválida:", parsed.error);
       return undefined;
    }
    return parsed.data
  } catch (error) {
    console.log(error);
    
  }
}
//---------------------------------