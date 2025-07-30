import { createApiResponseSchema } from "./genericSchema";
import { albumSchema, albumSchemaCreate, artistSchema, artistSchemaCreate, songSchema, songSchemaCreate } from "./schemas";
import z, { never } from 'zod'

export const artistApiResponseSchema=createApiResponseSchema(artistSchema)
export type Artist = z.infer<typeof artistSchema>;
export const albumApiResponseSchema=createApiResponseSchema(albumSchema)
export type Album = z.infer<typeof albumSchema>;

export const songApiResponseSchema=createApiResponseSchema(songSchema)
export type Song = z.infer<typeof songSchema>;

export const resposeApi=createApiResponseSchema(never())


export type formAlbum = z.infer<typeof albumSchemaCreate>
export type formArtist = z.infer<typeof artistSchemaCreate>
export type formSong = z.input<typeof songSchemaCreate>