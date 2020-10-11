<p align="center">
  <img src="../../../logo.png" alt="Aion Rubix platform" />
</p>
<h1 align="center">Rubix | Video Call  Service</h1>

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
As in video call module, its not related to video call basically, the main purpose of this module is to provide an endpoint where user can create appointment schedule call for future dates. Basesd on user preference our system create appointment against the user and will notify before 15 minutes of schedule time.  

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
| ENV_RBX_IDX_BASE_URL  |   |  Base URL of the daon server |

| ENV_RBX_TENANT_ID  |   |  Tendant Id |
| ENV_RBX_ENTITLEMENT_SERVER  |   |  Base URL of the entitlement server |
| ENV_RBX_CRON_JOB_TIME  |   |  Cron Job restart time |
| ENV_RBX_NOTIFICATION_SERVER  |   |  Base URL of the notification server |
| NODE_TLS_REJECT_UNAUTHORIZED  |   |  set value to `0` if you are running your server on http |

Export environment variables through terninals
```
$ export NODE_ENV=development
$ export ENV_RBX_APP_NAME=Rubix | Video Call Service
$ export ENV_RBX_PORT=3000
```
Or rename the `env.example` to `.env` update the values file for your environment
```
NODE_ENV=development
ENV_RBX_APP_NAME=Rubix | Video Call Service
ENV_RBX_PORT=3000
```

### Local Setup
Install the dependencies and devDependencies and start the server.

```sh
# Get the latest snapshot
$ git clone https://<username>@github.com/aiondigitalengineering/rubix.git

# Change directory
$ cd ./rubix/retail/middleware/videocall.service/

# To install NodeJS dependencies.
$ npm install

# To run the node server
$ npm run start:dev

```

### Docker Setup
Build and run videocall service container.

```sh
# Get the latest snapshot
$ git clone https://<username>@github.com/aiondigitalengineering/rubix.git

# Change directory
$ cd ./rubix/retail/middleware/videocall.service/

# To build the docker image
$ docker build  --no-cache  --force-rm -t rubixretailvideocall:dev .

# To run the rubixretailvideocall:dev container
$ sudo docker run -d rubixretailvideocall:dev

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

### Fetch Appointment By User Id: `/graphql`
```
POST /graphql
Host: localhost:3000
Content-Type: application/json
x-tenant-id: 9013C327-1190-4875-A92A-83ACA9029160
x-correlation-id: 9013C327-1190-4875-A92A-83ACA9029160

query {
  findAppointmentByUserId(user_id: "7d55a5db-739a-4b80-bd37-d3d30358d655"){
    id
    call_time
    gender
    status
    created_on
    updated_on
    user{
      id
      first_name
      middle_name
      last_name
      platform
      device_id
      firebase_token
      email
      gender
      date_of_birth
      nationality_id
      contact_no
    }
  }
}

```

### Create Appointment for User: `/graphql`
```
POST /graphql
Host: localhost:3000
Content-Type: application/json
x-tenant-id: 9013C327-1190-4875-A92A-83ACA9029160
x-correlation-id: 9013C327-1190-4875-A92A-83ACA9029160
mutation {
  addAppointment(
    appointment: {
      call_time: "2020-10-30 12:39:10"
      user_id: "7d55a5db-739a-4b80-bd37-d3d30358d655"
      gender: "M"
    }
  ) {
    id
    call_time
    gender
    status
    created_on
    updated_on
    user {
      id
      first_name
      middle_name
      last_name
      platform
      device_id
      email
      gender
      date_of_birth
      nationality_id
    }
  }
}

```

### Create Appointment for User: `/graphql`
```
POST /graphql
Host: localhost:3000
Content-Type: application/json
x-tenant-id: 9013C327-1190-4875-A92A-83ACA9029160
x-correlation-id: 9013C327-1190-4875-A92A-83ACA9029160
query {
  findAppointment(appointment_id: "c6e7f03b-3978-49aa-9337-5a19d3850e05") {
    id
    call_time
    gender
    status
    created_on
    updated_on
    user {
      id
      first_name
      middle_name
      last_name
      platform
      device_id
      email
      gender
      date_of_birth
      nationality_id
      contact_no
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
- [x] Improve error handling
