import { Hono } from 'hono'
import {User, Post} from '@prisma/client'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { validator } from 'hono/validator'
import { decode, sign, verify } from 'hono/jwt'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      SECRET_KEY : string
    }
}>()

  
userRouter.post('/signup', async (c) => {
    console.log("khala signup");
    validator('json', (value, c)=> {
        console.log("khala validator");
        console.log("value :", value);

    })
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try {
        const user = await prisma.user.create({
        data: {
            email : body.email,
            name : body.name,
            password : body.password
        }
        });

        //creating a jwt 
        const jwt = await sign({
        "id" : user.id,
        }, c.env.SECRET_KEY);

        return c.json({"token": jwt});
    } catch(e) {
        c.text("error in signing up");
    }
})

userRouter.post('/signin', async (c) => {

    //middleware validation

    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                email : body.email,
                password : body.password,
            }
        })
        if (!user) {
            c.status(403)
            return c.text("Invalid login credentials");
        }
        const jwt = await sign({
            "id" : user.id,
            }, c.env.SECRET_KEY);
        return c.json({"token": jwt});
    } catch(e) {

    }
    
    return c.text("signIn route");
})