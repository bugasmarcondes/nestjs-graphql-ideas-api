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

## PostgreSQL

- psql ideas \<username\> (connect using a specific user)
- psql -U postgres (connect using postgres user)
- create database ideas;
- \c ideas
- \dt
- \d idea
- \q

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