import z from "zod"

export const signup = z.object({
    email : z.string().email(),
    password : z.string(),
    name : z.string()
})

export const signin  = z.object({
    email : z.string().email(),
    password : z.string(),
})

export const createblogpost = z.object({
    title: z.string(),
    content : z.string()
})

export const updateblogpost = z.object({
    id: z.string(),
    title: z.string(),
    content : z.string()
})

//type inference in zod
export type SignUpInput = z.infer<typeof signup>;
export type SignInInput = z.infer<typeof signin>;
export type CreateBlogPost = z.infer<typeof createblogpost>;
export type UpdateeBlogPost = z.infer<typeof updateblogpost>;
