# Template Service

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## ❯ Table of Contents

- [Template Service](#template-service)
  - [❯ Table of Contents](#-table-of-contents)
  - [❯ How to Run](#-how-to-run)
    - [Pre-requisites](#pre-requisites)
    - [Running](#running)
  - [❯ App Structure](#-app-structure)
  - [❯ Migrations & Seeding](#-migrations--seeding)
    - [Creating/Dropping Tables](#creatingdropping-tables)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Test](#test)
  - [❯ Roadmap](#-roadmap)
    - [API Gateway](#api-gateway)
    - [Microservices](#microservices)
    - [Notes](#notes)
  - [Service Specific](#service-specific)
    - [Packages](#packages)
    - [Env Variables](#env-variables)
    - [TODOs](#todos)

![divider](./divider.png)

## ❯ How to Run

### Pre-requisites

You must install the following on your local machine:

1. Node.js (v12.x recommended)
2. Docker
3. Docker Compose
4. Database Client (MSSQL | MySQL | Postgres | Oracle)

### Running

1. On the Terminal, go into the project's root folder (`cd /project/root/folder`) and execute `npm start`. The start script will install all npm dependencies for all projects, lint the code, transpile the code, build the artifacts (Docker images) and run all of them via `docker-compose`.

2. Once the start script is done,

- The GraphQL Playground will be running on [http://localhost:3000/graphql](http://localhost:3000/graphql)
- The Swagger OpenAPI Specification will be running on [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## ❯ App Structure

```bash
├── dist
├── public
├── src
│   ├── app
│   │   ├── v1
│   │   │   ├── users
│   │   │   │   ├── user.class.ts
│   │   │   │   ├── user.dto.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.controller.specs.ts
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.resolver.ts
│   │   │   │   ├── users.service.ts
│   │   │   ├── v1.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.contrller.spec.ts
│   │   ├── app.modules.ts
│   │   ├── app.service.ts
│   │   ├── index.ts
│   ├── common
│   │   ├── configuration
│   │   │   ├── configuration.service.ts
│   │   │   ├── configuration.service.spec.ts
│   │   │   ├── dbconfiguration.service.ts
│   │   ├── decorators
│   │   ├── filters
│   │   │   ├── http-exception.filter.ts
│   │   ├── interceptors
│   │   │   ├── logging.interceptor.ts
│   │   ├── interfaces
│   │   │   ├── configuration.interface.ts
│   │   │   ├── index.ts
│   │   ├── mappers
│   │   ├── pipes
│   │   ├── common.module.ts
│   │   ├── constant.ts
│   │   ├── utilities.ts
│   ├── core
│   │   ├── database
│   │   │   ├── factories
│   │   │   ├── migrations
│   │   │   │   ├── 20200625222904_create_users_table.ts
│   │   │   ├── seeds
│   │   ├── middlewares
│   │   │   ├── index.ts
│   │   │   ├── kernel.middleware.ts
│   │   ├── providers
│   │   │   ├── index.ts
│   │   │   ├── swagger.middleware.ts
│   │   ├── repository
│   │   │   ├── base.repository.ts
│   │   │   ├── index.ts
│   │   │   ├── repository.module.ts
│   │   │   ├── user.repository.ts
│   │   ├── server.ts
│   ├── main.ts
├── test
│   ├── app.e2e.spec.ts
│   ├── jest.e2e.ts
├── .env
├── .env.example
├── .gitignore
├── .ncurc.json
├── .prettierrc
├── database.ts
├── schema.gql
├── nest-cli.json
├── nodemon.json
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.build.json
└── eslintrc.js
```

## ❯ Migrations & Seeding

Migrations are a way to make database changes or updates, like creating or dropping tables, as well as updating a table with new columns with constraints via generated scripts. We can build these scripts via the command line using `knex` command line tool.

### Creating/Dropping Tables

Let's create a `Users` table using the `knex` command line tool. In the root of our project run the following commands:

```bash
npm run migrate:make create_users_table
```

The above commands will generate migration scripts in `./src/core/database/migrations` with the given name plus a timestamp. (i.e. 20200625222904_create_users_table.ts). This is on purpose so that knex can run the older migration files first, and then the newer ones that build on top of them.

The content of these files will stub out empty `up` and `down` functions to create or drop tables or columns.

We now want to build out the `users` table using some of the built in knex methods.

**Example `20200625222904_create_users_table.ts`**

```javascript
import * as Knex from 'knex';
import { TABLE } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.USER, table => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.USER);
}
```

Now we can run the below command performing a migration and updating our local database:

```bash
npm run db:migrate
```

To rollback the last migration run the below following command.

```bash
npm run db:rollback
```

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## ❯ Roadmap

### API Gateway

- [ ] Add unit tests
- [ ] Add Rate Limiter
- [ ] Add CORS Policies
- [x] Add refresh token support
- [ ] Add request/input data validation
- [ ] Improve logging
- [ ] Improve error handling
- [ ] Add DataLoader support

### Microservices

- [x] Multiple Database client support
- [x] Add graphql
- [x] Add Swagger OpenAPI specification
- [x] Add health checks
- [ ] Add authorization
- [ ] Add caching
- [ ] Add unit tests
- [ ] Improve logging
- [ ] Improve error handling
- [x] Add Loaders Module to combine all the Loaders in one place.
- [x] Automatically add foreign keys to allow dataloader queries to be group.
- [x] Add Dataloader query results to be grouped by the Master Table Foreign-Key Value.
- [x] Add Customized Dataloader to allow selection columns in ResolveField() function.

### Notes

- Nest JS loads the Loader from first Module registered in the AppModule and if there is any Loader missing in the first Module and added in the second Module this will make problems.
  - Solution: Unify the Loaders Module and add that in the Appmodule directly (on Global level).

## Service Specific

### Packages

- @nestjs/schedule
- cron (Not Using currently)
- nestjs-redis

### Env Variables

- ENV_RBX_MINUTES_BEFORE_CALL_TO_SEND_NOTIFICATION=15
- ENV_RBX_REDIS_URL=redis://127.0.0.1:6379/4
- ENV_RBX_MAX_APPOINTMENTS_AT_A_TIME=5 (Related to the Available Agents at a time)
- ENV_RBX_NOTIFICATION_SERVER=http://127.0.0.1:4000/graphql (Temporary)
- ENV_RBX_ENTITLEMENT_SERVER=http://127.0.0.1:5000/graphql (Temporary)
- ENV_RBX_IDENTITY_SERVER=http://127.0.0.1:6000/graphql (Temporary)

### TODOs

1. Midnight Cron Job Fallback Approaches.
   1.1. Add a Retry mechanism inside Midnight Cron Job.
   1.2. Create a Rest API to invoke the action to manually invoke the process.
2. Remove the URL environment variables for other services and use Service Registry for this.
3. Double check the TimeZone difference when sending the Push Notification.
