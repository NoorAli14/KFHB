<p align="center">
  <img src="../../../logo.png" alt="Aion Rubix platform" />
</p>
<h1 align="center">Rubix | Compliance  Service</h1>

<p align="center">
  <img src="../../../divider.png" alt="divider" width="400" />
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [❯ Tech](#-tech)
- [❯ Getting Started](#-getting-started)
- [❯ Relational Schema](#-relational-schema)
- [❯ Up and Running](#-up-and-running)
  - [Environment Variables Setup](#environment-variables-setup)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)
- [Migrations & Seeding](#-migration-&-seeding)
- [Graphql Endpoints](#-graphql-endpoints)


<p align="center">
  <img src="../../../divider.png" alt="divider" width="400" />
</p>

## ❯ Tech

* [node.js] - evented I/O for the backend
* [NestJS](https://docs.nestjs.com/) - fast node.js network app & microservices framework.
* [Knex](http://knexjs.org/) -  In addition, we're going to use Knex, which is a database query builder that will interface with the **MySQL**, **PostgreSQL**, **SQLite**, **MSSQL**, **Oracle** and **MariaDB** databases for us.
- [GraphQL](http://graphql.org/) provides as a awesome query language for our api.
- [DataLoaders](https://github.com/facebook/dataloader) helps with performance thanks to caching and batching.
- [Smart Validation](https://github.com/pleerock/class-validator) thanks to [class-validator] with some nice annotations.

## ❯ Getting Started
In a Complaince Microservice it will follow the basics of microservice architecture and scoped with the customer detaile like KYC (Know Your Customer), FATCA (Foreign Account Tax Compliance Act) and CRS (Common Reporting Standard), A part from this we also include the AML (Anti Money Laundering) module in complince service as well here are the details of this module:

### Compliance Service Or Compliance Module
In this module we generalize the KYC, FATCA and CRS as templlates, and each of this has multiples section and each of the sections has multiple questions against every questions there are multiple or single options the template hierarchy is some how like `Templete` > `Sections` > `Questions` > `Options`  

## ❯ Relational Schema

<p align="center">
  <img src="../../../public/compliance-schema.PNG" alt="Relational DB Schema" />
</p>


## ❯ Up and Running

You must install the following on your local machine:

1. Node.js (v12.x recommended)
2. Docker
3. Docker Compose
4. Database Client (MSSQL | MySQL | Postgres | Oracle)


### Environment Variables Setup

| Name  |  Default Value  | Description
|---|---|---|
| NODE_ENV  |development|Node Environment  (production, development, staging, testing)
| ENV_RBX_APP_NAME  |Compliance Service| Name of the  service
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
| NODE_TLS_REJECT_UNAUTHORIZED  |   |  set value to `0` if you are running your server on http |

Export environment variables through terninals
```
$ export NODE_ENV=development
$ export ENV_RBX_APP_NAME=Rubix | Compliance Service
$ export ENV_RBX_PORT=3000
```
Or rename the `env.example` to `.env` update the values file for your environment
```
NODE_ENV=development
ENV_RBX_APP_NAME=Rubix | Compliance Service
ENV_RBX_PORT=3000
```

### Local Setup
Install the dependencies and devDependencies and start the server.

```sh
# Get the latest snapshot
$ git clone https://<username>@github.com/aiondigitalengineering/rubix.git

# Change directory
$ cd ./rubix/retail/middleware/compliance.service/

# To install NodeJS dependencies.
$ npm install

# To run the node server
$ npm run start:dev

```

### Docker Setup
Build and run compliance service container.

```sh
# Get the latest snapshot
$ git clone https://<username>@github.com/aiondigitalengineering/rubix.git

# Change directory
$ cd ./rubix/retail/middleware/compliance.service/

# To build the docker image
$ docker build  --no-cache  --force-rm -t rubixcompliance:dev .

# To run the rubixcompliance:dev container
$ sudo docker run -d rubixcompliance:dev

```

Once the start script is done.

- The GraphQL Playground will be running on [http://localhost:3000/graphql](http://localhost:3000/graphql)
- The Swagger OpenAPI Specification will be running on [http://localhost:3000/api/docs](http://localhost:3000/api/docs)


# Migrations & Seeding

We can run the below command performing a migration and updating our local database:

```bash
$ npm run db:migrate
```

To rollback the last migration run the below following command.

```bash
$ npm run db:rollback
```

## ❯ GraphQL Endpoints

### Fetch Template List: `/graphql`
```
POST /graphql
Host: localhost:3000
Content-Type: application/json
x-tenant-id: 9013C327-1190-4875-A92A-83ACA9029160
x-correlation-id: 9013C327-1190-4875-A92A-83ACA9029160

query {
  templatesList {
    id
    name
    name_ar
    status
    created_on
    updated_on
    sections {
      id
      name
      name_ar
      level
      status
      created_on
      updated_on
      questions {
        id
        title
        title_ar
        type
        rules
        status
        created_on
        updated_on
        options {
          id
          name
          name_ar
          status
          created_on
          updated_on
        }
      }
    }
  }
}

```

### Create Template Response: `/graphql`
```
POST /graphql
Host: localhost:3000
Content-Type: application/json
x-tenant-id: 9013C327-1190-4875-A92A-83ACA9029160
x-correlation-id: 9013C327-1190-4875-A92A-83ACA9029160

mutation {
  addTemplateResponse(input: {
    results: "Result here"
    remarks: "feedback"
    template_id: "37678C69-DDE5-4452-A66B-401F32211427" 
    user_id: "828605C2-7E50-40BC-AA88-C064CE63C155"
  }) {
    id
    results
    user_id
    remarks
    updated_on
    updated_by
    created_on
    created_by
    template {
      id
      name
      name
      name_ar
      status
      created_on
      updated_on
    }
  }
}

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

- [x] Multiple Database client support
- [x] Add graphql
- [x] Add Swagger OpenAPI specification
- [x] Add DataLoader support
- [x] Docker Containerization
- [ ] Add authorization
- [ ] Add caching
- [x] Add health checks
- [x] Add unit tests
- [ ] Improve logging
- [ ] Improve error handling
