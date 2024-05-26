# Medium-Clone
Developing Medium blog site clone
Link to Website : https://medium-clone-odqewg6xy-khalandarmokulas-projects.vercel.app/signup
Tech Stack used :

Backend : 

Environment - Honorepo, Node.js

Language - TypeScript

Serverless host - CloudFlare workers

Common: 

Zod validation

Deployed common as npm packager for use in both frontend  and backend 

Step 1 : Defined all the endpoints routes with help of hono that has similarities with express

Step 2 : Generated PostgresSql database strinf from NeonDb - https://console.neon.tech/app

Step 3 : Get connection pool URL from Prisma accelerate - prisma://accelerate.prisma-data.net/

# Why Step 3 is required ? 
"Cloudflare Workers do not support direct PostgreSQL connections. Instead, Cloudflare provides PostgreSQL Accelerate, a service that acts as a connection pool and query router between Cloudflare Workers and PostgreSQL databases. PostgreSQL Accelerate collects requests from Cloudflare Workers, optimizes query routing, and manages database connections, improving performance and scalability."

Step 4 : Initilized prisma in the project 
  1. npm i prisma
  2. npx prisma init - You will see a folder named prisma is created after this step.
