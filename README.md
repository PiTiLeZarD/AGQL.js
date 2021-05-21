# AGQL.js

This is a toy project for now. But the idea would be Supabase/Firebase meet GraphQL.

Many of my project ideas have graphql at the core and I always end up wasting a lot of time setting everything up when all I need is a ready to use database and a schema builder.

So this is an attempt at solving that issue and as with all projects, an attemps at pushing my own limits.

I will update this readme if anything interesting happens but for now

```
cd docker
docker-compose up -d
```

Will get you:

-   A home page on localhost:4000
-   the backend graphql server running on localhost:4000/backend/graphql
-   a playground for that server on localhost:4000/backend/graphql/playground
-   a react app for the admin system on localhost:1234
