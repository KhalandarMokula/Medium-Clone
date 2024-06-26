import { Hono } from 'hono'
import {User, Post} from '@prisma/client'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { validator } from 'hono/validator'
import { decode, sign, verify } from 'hono/jwt'
import { SignInInput, SignUpInput, signin, signup } from '@khalandar/medium-clone-common'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      SECRET_KEY : string
    }
}>()

  
userRouter.post('/signup', async (c) => {
    console.log("khala signup");
    const body = await c.req.json();
    const { success } = signup.safeParse(body);
    if (!success) {
        c.status(400);
        return c.text("Invalid SignUp data");
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        console.log("entry to db");
        const user = await prisma.user.create({
        data: {
            email : body.email,
            name : body.name,
            password : body.password
        }
        });
        console.log("creating a jwt ");
        //creating a jwt 
        const jwt = await sign({
        "id" : user.id,
        }, c.env.SECRET_KEY);
        console.log("returning json");
        return c.json({"token": jwt, "name": user.name});
    } catch(e) {
        console.log("khala");
        return c.text("error in signing up");
    }
})

userRouter.post('/signin', async (c) => {

    //middleware validation

    const body = await c.req.json();
    const { success } = signin.safeParse(body);
    if (!success) {
        c.status(400);
        return c.text("Invalid SignIn data");
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                email : body.email,
                password : body.password,
            }, select :{
                name:true,
                id: true,
            }
        })
        if (!user) {
            c.status(403)
            return c.text("Invalid login credentials");
        }
        const jwt = await sign({
            "id" : user.id,
            }, c.env.SECRET_KEY);
        return c.json({"token": jwt, "name": user.name});
    } catch(e) {

    }
    
    return c.text("signIn route");
})