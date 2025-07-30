import z from 'zod'

export const createApiResponseSchema=<T extends z.ZodTypeAny>(dataSchema:T)=>{
    return z.object({
        result:z.boolean(),
        valoration:z.boolean(),
        message:z.string(),
        log:z.string().nullable(),
        data:z.array(dataSchema)
    })
}

