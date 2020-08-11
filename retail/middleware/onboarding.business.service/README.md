<h1 align="center">Rubix | Onboarding Business Service</h1>
<br />
## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [How to Run](#-how-to-run)
- [App Structure](#-app-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

![divider](./divider.png)

## ❯ How to Run

### Pre-requisites

You must install the following on your local machine:

1. Node.js (v12.x recommended)
2. Docker
3. Docker Compose

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

### API Gateway

- [ ] Add unit tests
- [x] Add Rate Limiter
- [x] Add CORS Policies
- [x] Add refresh token support
- [x] Add Swagger OpenAPI specification
- [x] Add request/input data validation
- [x] Add health checks
- [x] Add graphql
- [ ] Improve logging
- [ ] Improve error handling
- [ ] Add DataLoader support