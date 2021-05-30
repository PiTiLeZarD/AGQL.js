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
docker-compose run --rm --no-deps admin yarn relay
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

## The concept

I'm writing all this here so if you're jumping on (first who are you? say hi, I'm keen!) you know what I'm trying to achieve, and also if I get lost I have my roadmap :D

### description

This is a central piece of data that's abstracting data structures. The idea is that it's neither sql, neither sequelize, neither graphql but we'll have `interpolators` for each.

A `backendModelDescription` is a preconfigured database that the backend will use. It is not dynamic and I could completely bypass it, but I feel like putting myself in more trouble so the whole project will benefit from it ;) This way both the backend and the actual database will use the same tools.

### interpolateDescription

This function is capable of taking the backend models and returning a `description` of the database we're trying to build.

### interpolateModels

This bit is what takes a `description` and a `sequelize db` and defines models and links them together.

### interpolateSchema

This bit will take a `description` and the `models` for the target db and will compose a graphql schema.

### putting it all together

Roughly and simply, our servers could run as is:

```jsx
// backend
const backendModels = interpolateModels(sqlitedb, backendDescription);
const backendSchema = interpolateSchema(backendModels, backendDescription);

// graphql
const description = interpolateDescription(backendModels);
const models = interpolateModels(configureDb(), description);
const schema = interpolateSchema(models, description);
```
