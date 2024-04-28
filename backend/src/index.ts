import { Hono } from 'hono'
import {User, Post} from '@prisma/client'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { validator } from 'hono/validator'
import { decode, sign, verify } from 'hono/jwt'
//const zod = require("zod");
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

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', async (c) => {

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

app.post('/api/v1/user/signin', async (c) => {

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
  const decodedPayload  = await verify(body["jwt"], c.env.SECRET_KEY);
  return c.text("signIn route");
})

app.post('/api/v1/blog', (c)=> {
  return c.text("post uploaded ");
})

app.put('/api/v1/blog', (c)=> {
  return c.text("post edited");
})

/*
The issue seems to be that both /api/v1/blog/:id and /api/v1/blog/bulk are being handled by the same route, 
and it's likely that the route for /api/v1/blog/:id is being matched first, causing /api/v1/blog/bulk to be redirected to /api/v1/blog/:id.
To resolve this issue, you can reorder the route definitions so that more specific routes are defined before more general ones.
*/
app.get('/api/v1/blog/bulk', (c) => {
  return c.text("bulk blog");
})

app.get('/api/v1/blog/:id', (c)=> {
  const id = c.req.param('id');
  
  return c.text("request for blog with if: {id} received");
})



export default app
