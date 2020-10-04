<p align="center">
  <img src="../../../logo.png" alt="Aion Rubix platform" />
</p>
<h1 align="center">Rubix | Identity  Service</h1>
<br />

Table of Contents

- [Getting Started](#-getting-started)
- [How to Run](#-how-to-run)
- [App Structure](#-app-structure)
- [Migrations & Seeding](#-migration-&-seeding)
- [Roadmap](#-roadmap)
- [License](#-license)

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
TY│   │   ├── app.contrller.spec.ts
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
## ❯ Environment Variables Setup
| Name  |  Default Value  | Description
|---|---|---|
| NODE_ENV  |development|Node Environment  (production, development, staging, testing)
| ENV_RBX_APP_NAME  |Identity Service| Name of the  service
| ENV_RBX_API_URL_PREFIX  | api/v1  | API url prefix  |
| ENV_RBX_PORT  |   |Port number where the server is listing|
| ENV_RBX_DB_USERNAME  |   | Username of the database |
| ENV_RBX_DB_PASS  |   | Password of the database   |
| ENV_RBX_DB_NAME  |   |  Name of the database |
| ENV_RBX_DB_HOST  |   | Hostname of the database  |
| ENV_RBX_DB_PORT  |   |  Port number of the database |
| ENV_RBX_DB_TIMEOUT  |   | Database timeout value in miliseconds |
| ENV_RBX_DB_DEBUG  |  false | if the value of this varibale is `true` then knex database connectivity establish in debug mode.  |
| ENV_RBX_SWAGGER_ENABLED  |  false | This variable is used to publish the swagger documentation  |
| ENV_RBX_SWAGGER_ROUTE  |/api/docs   |  This variable is used to change the swagger api documentation route. |
| ENV_RBX_GRAPHQL_DEBUG  | false  | This variable is to used to run graphql in debug mode |
| ENV_RBX_GRAPHQL_PLAYGROUND  | false  | This variable is used for graphql query interface  |
| ENV_RBX_IDENTITYX_BASE_URL  |   |  Base URL of the daon server |
| ENV_RBX_IDENTITYX_API_VERSION  |   | API version of the daon server, like (v1, v2)  |
| ENV_RBX_IDENTITYX_TOKEN  |   |  Basic auth token of the daon server |
| ENV_RBX_IDENTITYX_TENANT  |   | Tenant name of the daon server   |
| ENV_RBX_IDENTITYX_USERNAME  |   |  If you don't want  to authenticate service with `ENV_RBX_IDENTITYX_TOKEN` then you can specift the daon username|
| ENV_RBX_IDENTITYX_PASSWORD  |   | If you don't want  to authenticate service with `ENV_RBX_IDENTITYX_TOKEN` then you can specift the daon password  |
| ENV_RBX_IDENTITYX_REG_POLICY  |   | Registration Policy of the daon server  |
| ENV_RBX_IDENTITYX_APPLICATION  |   |  Application ID of the daon server |
| ENV_RBX_IDENTITYX_EVALUATION_POLICY  |   |  Evaluation policy of the DAON server |
| NODE_TLS_REJECT_UNAUTHORIZED  |   |  set value to `0` if you are running your server on http |
## ❯ Database
# Relational Schema
# Migrations & Seeding

Migrations are a way to make database changes or updates, like creating or dropping tables, as well as updating a table with new columns with constraints via generated scripts. We can build these scripts via the command line using `knex` command line tool.

### Creating/Dropping Tables

Let's create a `Users`, `Posts` and `Comments` tables using the `knex` command line tool. In the root of our project run the following commands:

```bash
$ npm run migrate:make create_users_table
```

The above commands will generate migration scripts in `./src/core/database/migrations` with the given name plus a timestamp. (i.e. 20200625222904_create_users_table.ts). This is on purpose so that knex can run the older migration files first, and then the newer ones that build on top of them.

The content of these files will stub out empty `up` and `down` functions to create or drop tables or columns.

We now want to build out the `users` `posts` `commentrs` tables using some of the built in knex methods.

**Example `20200625222904_create_users_table.ts`**

```javascript
import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.USER, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
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

```bash
$ npm run migrate:make create_post_table
```

**Example `20200727191324_create_post_table.ts`**

```javascript
import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.POST, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.text('description');
    table
      .uuid('user_id')
      .references('id')
      .inTable(TABLE.USER)
      .onDelete('cascade');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.POST);
}
```

```bash
$ npm run migrate:make create_comment_table
```

**Example `20200727191528_create_comment_table.ts`**

```javascript
import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.COMMENT, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.text('message');
    table
      .uuid('post_id')
      .references('id')
      .inTable(TABLE.POST)
      .onDelete('cascade');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.COMMENT);
}
```

Now we can run the below command performing a migration and updating our local database:

```bash
$ npm run db:migrate
```

To rollback the last migration run the below following command.

```bash
$ npm run db:rollback
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## ❯ Roadmap

### Rubix Boilerplate

- [x] Multiple Database client support
- [x] Add graphql
- [x] Add Swagger OpenAPI specification
- [x] Add DataLoader support
- [x] Docker Containerization
- [ ] Add authorization
- [ ] Add caching
- [x] Add health checks
- [ ] Add unit tests
- [ ] Improve logging
- [ ] Improve error handling
