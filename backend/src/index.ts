import { Hono } from 'hono'
import {User, Post} from '@prisma/client'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { validator } from 'hono/validator'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
/*
 Note 1 : you cannot create prismaClient instance because the env is accesible only through 'context:c' in the routes, you hav eto define PrismaClient in each of the rotes 
          respectively , or you can create it in a middleware which indeed is common to all the routes
 Note 2 : you will notice an error depecting c.env is undefined, TypeScript is not able to recognize the env variables which are declared in wrangler.toml since .toml is specific to cloudflare 
          In order for it to recognize, we have to explicitly declare it in the bindings of hono as defined below.
*/
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    SECRET_KEY : string
  }
}>()

app.use('/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);



export default app
