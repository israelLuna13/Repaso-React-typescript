import z from 'zod'
const artistSchemaBase=z.object({
    name:z.string(),
    country:z.string()
})
export const artistSchema = artistSchemaBase.extend({
    id:z.number(),
   
})
export const artistSchemaCreate = artistSchemaBase

export const albumSchemaBase = z.object({
    title:z.string(),
    release_year:z.number()
   
})
export const albumSchema = albumSchemaBase.extend({
    id:z.number(),
    name:z.string(),
})
export const albumSchemaCreate = albumSchemaBase.extend({
     artist_id:z.number(),

})

export const songSchemaBase=z.object({
    title:z.string().trim().min(1,"Title is required"),
    duration:z.coerce.number().min(1,"Duration is required"),
})
export const songSchemaCreate= songSchemaBase.extend({
    album_id:z.coerce.number().min(1,"Album is required")
})
export const songSchema= songSchemaBase.extend({
    id:z.string(),
    album:z.string()
})