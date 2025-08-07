import z from 'zod'
const artistSchemaBase=z.object({
    name:z.string(),
    country:z.string()
})
export const artistSchema = artistSchemaBase.extend({
    id:z.number(),
   
})
export const artistSchemaCreate = artistSchemaBase
//---------------------------------------------------
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
//---------------------------------------------------

export const songSchemaBase=z.object({
    title:z.string().trim().min(1,"Title is required"),
    duration:z.coerce.number().min(1,"Duration is required"),
})
export const songSchemaCreate= songSchemaBase.extend({
    album_id:z.coerce.number().min(1,"Album is required")
})
export const songSchema= songSchemaBase.extend({
    id:z.number(),
    album:z.string()
})
//---------------------------------------------------
export const playListSchemaBase=z.object({
    name: z.string().trim().min(1,"Name is required"),

})
export const playListSchemaCreate=playListSchemaBase.extend({
  user_id:z.coerce.number().min(1,"User is required")
})
export const playListSchema=playListSchemaBase.extend({
     id:z.number(),
     user_name: z.string(),
})
//---------------------------------------------------

export const playListSongsSchemaBase=z.object({

})

export const playListSongsSchemaCreate=z.object({
    playlist_id:z.coerce.number().min(1,"Playlist is required"),
    song_id:z.coerce.number().min(1,"Song is required")
})
export const playListSongsSchema=z.object({
    id:z.number(),
    name:z.string(),
    title:z.string()
})
//----------------------------------------------------


export const userSchemaCreate=z.object({
      name: z.string().trim().min(1,"Name is required"),
      email: z.email().trim().min(1,"Email is required"),

})
export const userSchema=z.object({
    id:z.number(),
    name:z.string(),
    email:z.string()
})

//----------------------------------------------------

export const likeSchemaCreate=z.object({
    user_id:z.coerce.number().min(1,"User is required"),
    song_id:z.coerce.number().min(1,"Song is required")
})

export const likesSchema=z.object({
    id:z.number(),
    user_name:z.string(),
    song_name:z.string()
})
//----------------------------------------------------

export const playHistorySchemaCreate=z.object({
   user_id:z.coerce.number().min(1,"User is required"),
   song_id:z.coerce.number().min(1,"Song is required")
})
export const playHistorySchema=z.object({
    id:z.number(),
    played_at:z.string(),
    user_name:z.string(),
    song_name:z.string()
})
//----------------------------------------------------