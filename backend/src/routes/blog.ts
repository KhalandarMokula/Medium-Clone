import { Hono } from 'hono'
import {User, Post} from '@prisma/client'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { validator } from 'hono/validator'
import { decode, sign, verify } from 'hono/jwt'
import { CreateBlogPost, UpdateeBlogPost, createblogpost, updateblogpost } from '@khalandar/medium-clone-common'

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      SECRET_KEY : string
    }
    Variables: {
        userId: string
    }
}>()

//middleware 
blogRouter.use("/*", async (c, next) => {
    const authorizationToken = c.req.header('authorization') || "";
     
    try {
        console.log("khalandar 1 authorizationToken", authorizationToken);
        const verifyResult = await verify(authorizationToken.slice(7), c.env.SECRET_KEY);
        console.log("khalandar 2");
        if (verifyResult) {
            c.set('userId', verifyResult.id);
            await next();
        } else {
            c.status(403);
            return c.json({message : "You are not looged in"});
        }
    } catch(e) {
        console.log("khalandar 3: ", e);
        console.log(e);
    }
 
})

//Publish new blog post
blogRouter.post('/', async (c)=> {

    const body = await c.req.json();
    const { success } = createblogpost.safeParse(body);
    if (!success) {
        c.status(400);
        return c.text("Invalid SignUP data");
    }

    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("trying to create a blog");
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId : userId,
        }
    });
    console.log("tpoat create");
    return c.json({"id": post.id});
    
})

//Edit existing blog post
blogRouter.put('/', async (c)=> {
    const body = await c.req.json();
    const { success } = updateblogpost.safeParse(body);
    if (!success) {
        c.status(400);
        return c.text("Invalid SignUP data");
    }

    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId : userId,
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.text("Blog edited successfully");
    } catch(e) {
        c.status(403);
        return c.text("Blog editing failed");
    }
})
  
/*
The issue seems to be that both /api/v1/blog/:id and /api/v1/blog/bulk are being handled by the same route, 
and it's likely that the route for /api/v1/blog/:id is being matched first, causing /api/v1/blog/bulk to be redirected to /api/v1/blog/:id.
To resolve this issue, you can reorder the route definitions so that more specific routes are defined before more general ones.
*/
//fetch all posts
blogRouter.get('/bulk', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try {
        const posts = await prisma.post.findMany({})
        return c.json({"posts": posts});
    } catch(e) {
        c.status(403);
        return c.text("Blog fetch failed");
    }
    return c.text("bulk blog");
})

//fetch a particular blog
blogRouter.get('/:id', async (c)=> {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const postId = c.req.param("id");
    console.log("postId: ", postId);
    try {
        const post = await prisma.post.findFirst({
            where: {
                id : postId,
            },
        })
        return c.json({"posts": post});
    } catch(e) {
        c.status(403);
        return c.text("Blog fetch failed");
    }
})
  
  