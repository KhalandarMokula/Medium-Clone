# Medium-Clone
Developing Medium blog site clone

Link to Website : https://medium-clone-odqewg6xy-khalandarmokulas-projects.vercel.app/signup

Tech Stack used :

    Language: 
    
        TypeScript
    
    Backend : 
    
      Serveless Platform : 
        
        Clouffare workers
    
      EndPoints defined with :
      
        Hono (https://hono.dev/) - npm create hono@latest  
          - "Hono" is a JavaScript framework for building APIs and middleware on the edge with Cloudflare Workers. 
      
      Database :
    
        ORM - PRISMA 
        
        Db - Postgressql
    
    Common: Deployed common as npm packager for use in both frontend  and backend 
    
     Validation :
     
        zod
    
    Frontend :
    
        React
  
Development Steps : 

    Step 1 : Defined all the endpoints routes with help of hono that has similarities with express 
    
    Step 2 : Generated PostgresSql database string from NeonDb - https://console.neon.tech/app
    
    Step 3 : Got connection pool URL from Prisma accelerate - prisma://accelerate.prisma-data.net/

    # Why Step 3 is required ? 
    
    "Cloudflare Workers do not support direct PostgreSQL connections. Instead, Cloudflare provides PostgreSQL Accelerate, a service that acts as a connection pool and query router between Cloudflare Workers and PostgreSQL databases. PostgreSQL Accelerate collects requests from Cloudflare Workers, optimizes query routing, and manages database connections, improving performance and scalability."

    Step 4 : Initilized prisma in the project 
    
      1. npm i prisma
      
      2. npx prisma init - You will see a folder named prisma is created after this step.
      
      3. Replace DATABASE_URL in .env - The DATABASE_URL here shoudl be of the PRISMA Neon Db url | .env file is used to define commonly used variables across the entire module.
      
      4. Add DATABASE_URL as the connection pool url in wrangler.toml - The DATABASE_URL here should be of the Prisma accelerate
      
      5. Initialize the Schema in schema.prisma

      6. Migrate your database - npx prisma migrate dev --name init_schema

      7. Generate the prisma client - npx prisma generate --no-engine

      8. Add the accelerate extension - npm install @prisma/extension-accelerate
      


Steps to create and deploy Hono to cloudfare workers : 

      1. Install Wrangler: npm install -g wrangler
         
      2. Initialize a New Project:
         
          npm create hono@latest - This will create you a basic hono app in which you can write your code for you backend
         
     3. Develop backend code- endpoint api's, database connections, jwt etc.
    
     4. npx wrangler login - login to your cloudfare account through cli - this is something similiar to logging into your aws ec2 instance from local machine cli.
    
     5. npx wrangler whoami - to verify the login
    
     6. npm run deploy - this will deploy my application backend application.
        


To Do : Update complete development process
