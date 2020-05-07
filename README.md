# Scope

A place to see and post ideas in the style of reddit and twitter

## User stories

- Authenticate users
- Users can CRUD ideas
- Users can upvote/downvote ideas
- Users can bookmark ideas
- Users can comment on ideas?
- New ideas can be seen in realtime

## Stack

- Databse, PostgreSQL
- REST API - NestJS
- GraphQL API - NestJS
- Rest Frontend - React
- GraphQL Frontend - React with Apollo Client

# Utils

## NestJS

- It's a Node.js server side framework, heavily influenced by Angular, which in turn was influenced by .Net
- A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## General info

- http://gitignore.io/ (OS, backend language, text editor)

## Troubleshoot

- NestJS can't connect to database
    - Check path in ormconfig.json, I had to change from /src to /dist in the array
    - "entities": ["./dist/**/*.entity.ts", "./dist/**/*.entity.js"]

- Cannot start PostgreSQL server because port is already in use
    - sudo lsof -i :5432 (check if anything is running on port)
    - sudo launchctl list | fgrep postg (list daemon process)
    - sudo launchctl stop <name> (kill process)
        - <name> = com.edb.launchd.postgresql-12

- Error TS2416: Property 'intercept'
    ````
    [16:13:40] Starting compilation in watch mode...
    src/shared/logging.interceptor.ts:12:3 - error TS2416: Property 'intercept' in type 'LoggingInterceptor' is not assignable to the same property in base type 'NestInterceptor<any, any>'.
    Type '(context: ExecutionContext, call$: Observable<any>) => Observable<any>' is not assignable to type '(context: ExecutionContext, next: CallHandler<any>) => Observable<any> | Promise<Observable<any>>'.
    Types of parameters 'call$' and 'next' are incompatible.
    Type 'CallHandler<any>' is missing the following properties from type 'Observable<any>': _isScalar, source, operator, lift, and 6 more.
    12   intercept(
    ~~~~~~~~~
    [16:13:43] Found 1 error. Watching for file changes.
    ````
    - Solution, downgrade these packages
        ````
        "dependencies": {
            "@nestjs/common": "^5.3.11",
            "@nestjs/core": "^5.3.11",
            "@nestjs/typeorm": "^5.2.2",
            "rxjs": "^6.2.2",
        ````

## PostgreSQL

- Connecting and creating database
    - psql
    - create database ideas;
    - \c ideas
- Connecting with a user
    - psql ideas \<username\> (connect using a specific user)
    - psql -U postgres (connect using postgres user)
- Operations and queries
    - \dt (lists all data types or only those that match pattern)
    - \d idea (delete the database)
    - \q (quits psql program)

# Tutorial

## Hello world
- npm i -g @nestjs/cli
- nest new backend
    - yarn
- yarn start:dev
- yarn add dotenv
- nestjs-graphql-ideas-api/backend/.env

## Database connection
- yarn add pg typeorm @nestjs/typeorm
    - configuring database connection
- installing postgreSQL
- edited .zshrc and inserted export PATH=/Library/PostgreSQL/12/bin:$PATH
- nestjs-graphql-ideas-api/backend/ormconfig.json
- nestjs-graphql-ideas-api/backend/src/app.module.ts
- nestjs-graphql-ideas-api/backend/src/idea/idea.entity.ts

## CRUD operations
- nest g mo idea
    - generates nestjs-graphql-ideas-api/backend/src/idea/idea.module.ts
- nest g controller idea
    - generates nestjs-graphql-ideas-api/backend/src/idea/idea.controller.ts
    - generates nestjs-graphql-ideas-api/backend/src/idea/idea.controller.spec.ts
- nest g service idea
    - generates nestjs-graphql-ideas-api/backend/src/idea/idea.service.ts
    - generates nestjs-graphql-ideas-api/backend/src/idea/idea.service.spec.ts
- nestjs-graphql-ideas-api/backend/src/idea/idea.controller.ts
    - first we declare the method signature, and after creating module and service, we write the actual implementation
- nestjs-graphql-ideas-api/backend/src/idea/idea.module.ts
- nestjs-graphql-ideas-api/backend/src/idea/idea.service.ts
- nestjs-graphql-ideas-api/backend/src/idea/idea.dto.ts
- nestjs-graphql-ideas-api/backend/src/app.module.ts

## Errors and Logging

Nest comes with a ***built-in exceptions*** layer which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.
````
{
  "statusCode": 500,
  "message": "Internal server error"
}
````
- Exception filters
    - Are designed to add logging or use a different JSON schema based on some dynamic factors. They let you control the exact flow of control and the content of the response sent back to the client.
- Interceptors, make it possible to:
    - bind extra logic before / after method execution
    - transform the result returned from a function
    - transform the exception thrown from a function
    - extend the basic function behavior
    - completely override a function depending on specific conditions (e.g., for caching purposes)
    
- nestjs-graphql-ideas-api/backend/src/shared/http-error.filter.ts
- nestjs-graphql-ideas-api/backend/src/app.module.ts
- nestjs-graphql-ideas-api/backend/src/shared/logging.interceptor.ts

## Validation Errors

- nestjs-graphql-ideas-api/backend/src/idea/idea.service.ts
- yarn add class-transformer class-validator
- check if the incoming object has the correct data type
    - nestjs-graphql-ideas-api/backend/src/shared/validation.pipe.ts
- nestjs-graphql-ideas-api/backend/src/idea/idea.dto.ts
- nestjs-graphql-ideas-api/backend/src/idea/idea.controller.ts

## Users module

- nest g mo user
- nest g controller user
- nest g service user
- touch src/user/user.dto.ts
- touch src/user/user.entity.ts
- import user in app.module.ts
- yarn add bcryptjs jsonwebtoken
    - for generating users, we're going to need those packages
- yarn add -D @types/jsonwebtoken @types/bcryptjs
    - since we're in Typescript we're going to need the types for the respective modules
- nestjs-graphql-ideas-api/backend/src/user/user.entity.ts
- nestjs-graphql-ideas-api/backend/src/user/user.module.ts
- nestjs-graphql-ideas-api/backend/src/user/user.dto.ts
- nestjs-graphql-ideas-api/backend/src/user/user.controller.ts
- nestjs-graphql-ideas-api/backend/src/user/user.service.ts
- using JWT for login and register methods
    - user.entity.ts, implementing methods hashPassword, toResponseObject, comparePassword, token
    - user.service.ts, implemening methods login and register
- nestjs-graphql-ideas-api/backend/.env
- yarn start:dev
- GET http://localhost:4000/api/users (check if there's any user in the database)
- POST http://localhost:4000/register (check validation UserAlreadyExist, PasswordMissing)
- POST http://localhost:4000/login (check if we can login)

## Authentication

- Authorization Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.
- nestjs-graphql-ideas-api/backend/src/shared/auth.guard.ts
- nestjs-graphql-ideas-api/backend/src/user/user.controller.ts
- nestjs-graphql-ideas-api/backend/src/user/user.decorator.ts