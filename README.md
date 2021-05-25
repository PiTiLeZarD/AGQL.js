# AGQL.js

## Introduction

This is a toy project for now. But the idea would be Supabase/Firebase meet GraphQL.

Many of my project ideas have graphql at the core and I always end up wasting a lot of time setting everything up when all I need is a ready to use database and a schema builder.

So this is an attempt at solving that issue and as with all projects, an attempt at pushing my own limits.

I will update this readme if anything interesting happens but for now

## Setup

```sh
cd docker
docker-compose run --rm --no-deps graphql yarn install
docker-compose up
```

## Services

-   A home page on localhost:4000
-   the backend graphql server running on localhost:4000/backend/graphql (with playground localhost:4000/backend/graphql/playground)
-   the graphql server running on localhost:4000/graphql (with playground localhost:4000/graphql/playground)
-   a react app for the admin system on localhost:1234
-   an adminer service connected to a mariadb server on localhost:8080

## Configuration

docker/.env is where it's at, will detail more when it's stays the same for more than a day ;)
