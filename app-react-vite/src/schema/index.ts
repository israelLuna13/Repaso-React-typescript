import { createApiResponseSchema } from "./genericSchema";
import { albumSchema, albumSchemaCreate, artistSchema, artistSchemaCreate, playListSchema, playListSchemaCreate, playListSongsSchema, playListSongsSchemaCreate, songSchema, songSchemaCreate, userSchema, userSchemaCreate } from "./schemas";
import z, { never } from 'zod'

export const artistApiResponseSchema=createApiResponseSchema(artistSchema)
export type Artist = z.infer<typeof artistSchema>;
//--------------------------------

export const albumApiResponseSchema=createApiResponseSchema(albumSchema)
export type Album = z.infer<typeof albumSchema>;
//--------------------------------

export const songApiResponseSchema=createApiResponseSchema(songSchema)
export type Song = z.infer<typeof songSchema>;

//--------------------------------

export const playListApiResponseSchema=createApiResponseSchema(playListSchema)
export type PlayList = z.infer<typeof playListSchema>
//--------------------------------
export const playListSongApiResponseSchema=createApiResponseSchema(playListSongsSchema)
export type PlayListSong = z.infer<typeof playListSongsSchema>
//--------------------------------
export const userpiResponseSchema=createApiResponseSchema(userSchema)
export type User = z.infer<typeof userSchema>
//--------------------------------


export const resposeApi=createApiResponseSchema(never())

//--------------------------------

export type formAlbum = z.infer<typeof albumSchemaCreate>
export type formArtist = z.infer<typeof artistSchemaCreate>
export type formSong = z.input<typeof songSchemaCreate>
export type formPlayList= z.input<typeof playListSchemaCreate>
export type formPlayListSong= z.input<typeof playListSongsSchemaCreate>

export type formUser= z.input<typeof userSchemaCreate>