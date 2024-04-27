import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', (c) => {
  return c.text("sgnup route");
})

app.post('/api/v1/user/signin', (c) => {
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
