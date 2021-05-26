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
docker-compose up -d
```

Everytime you change the schema you'll have to restart the graphql schema (for now)

```sh
docker-compose restart graphql
```

## Services

All services started on localhost after running the setup process:

| Port | Entry Points                | Service                                          |
| ---- | --------------------------- | ------------------------------------------------ |
| 1234 | /                           | react admin app                                  |
| 4000 | /                           | homepage                                         |
| 4000 | /backend/graphql            | the backend graphql server used by the admin app |
| 4000 | /backend/graphql/playground | A playground for the backend server              |
| 5000 | /                           | homepage                                         |
| 5000 | /graphql                    | the actual graphql server generated              |
| 5000 | /graphql/playground         | A playground for the graphql server              |
| 8080 | /                           | Adminer for the mariadb                          |

## Configuration

docker/.env is where it's at:

| Name                     | Description                                                       | Default value                         |
| ------------------------ | ----------------------------------------------------------------- | ------------------------------------- |
| DEBUG                    | Set the apps on debug (0, 1)                                      | 1                                     |
| SCHEMA_CONFIG_DB_PATH    | All graphql meta configs are stored there                         | /db/backend-graphql.sqlite3           |
| ADMIN_PORT               | Port of the react admin app                                       | 1234                                  |
| GRAPHQL_PORT             | Port of the graphql server                                        | 5000                                  |
| GRAPHQL_DB_HOST          | Container name and service name for the graphql mariadb           | agql_mariadb                          |
| GRAPHQL_DB_DATABASE      | The database name for graphql server                              | graphql                               |
| GRAPHQL_DB_USERNAME      | The usernanme for the graphql server                              | graphql                               |
| GRAPHQL_DB_PASSWORD_FILE | The file where the password is saved to access the graphql server | /run/secrets/DB_ROOT_PASSWORD         |
| BACKEND_PORT             | Port of the backend graphql server                                | 4000                                  |
| BACKEND_GQL_API_URL      | The url for the backend graphql api used by the react admin app   | http://localhost:4000/backend/graphql |
