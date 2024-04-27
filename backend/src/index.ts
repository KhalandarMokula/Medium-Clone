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

app.get('/api/v1/blog/:id', (c)=> {
  const id = c.req.param('id');
  
  return c.text("request for blog with if: {id} received");
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text("bulk blog");
})

export default app
