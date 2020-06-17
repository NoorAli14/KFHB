
<h1 align="center">Angular Boilerplate</h1>
<br />

---

## ❯ Table of Contents
- [Local Setup](#-local-setup)
- [Docker setup](#-docker-setup)
- [Folder Structure](#-folder-structure)
- [API Calling Mechanism](#-api-calling-mechanism)
- [Global Notification Handler](#-global-notification-handler)
- [Secure Local Storage information](#-secure-local-storage-information)
- [Set up the environment Variables Dynamically](#-set-up-the-environment-variables-dynamically)
- [Environments](#-environments)
- [Access Token and Refresh Token Strategy](#-access-token-and-refresh-token-strategy)


## ❯ Local Setup

## Installation

```SH
$ npm install
```
## Run Application and start development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```SH
$ ng serve
```

## Create Build for Production

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

```SH
$ ng build --prod
```

## ❯ Docker Setup

To run the application on Docker, make sure docker installed and running on your system.
A `Dockerfile` is present in the root directory having all the configuration.

## Build Image

Run `docker build . -t <image-name>` to build the image. 

## Run Image

Run `docker run -p 4200:4200 <image-name>` to build the image. Navigate to `http://localhost:4200/`.

## ❯ Folder Structure

| Folder Path | Description |
| --- | --- |
| /src/app/auth | Auth folder contain all the components related to authentication including `Login`, `Register`, `Forget Password` and `Reset Password`. |
| /src/app/core | Anything we need the single instance in our application including `components`, `services`, `pipes` or `directives` we used to create in Core folder. |
| /src/app/core | All the routing error pages including `404` and `500` we create in Error folder. |
| /src/app/feature | This folder has all the features of our application. This folder has a `feature.module`, all the features of the application are registered in this module. |
| /src/app/shared | All shared `components`, `directive`, `services` and `modules` are created in shared folder. |


## ❯ API Calling Mechanism

### Feature Level HTTP Service

Each feature has its own HTTP service, which calls the global generic HTTP service which act as a middleware to interact with backend.

### Global HTTP Service

There is a generic HTTP service `Network Service` which has all the HTTP generic methods. Each feature calls these methods to interact with backend.

## ❯ Global Notification Handler

There is a global event bus service inside core module, which is used to register global events. It will trigger that event whenever that event calls.

## ❯ Secure Local Storage information

A third party `crypto-js` packages has been used to secure the storage. There is a storage service inside core module which will encrypt the item before storing and decrypt before retreiving the item.

## ❯ Set up the environment Variables Dynamically

To add the environment variable dynamically, there is a file `env.template.js` inside `assets` folder. All the variables are added there. This file will be replace by `env.js` when `startup.sh` will be executed through `Docker` file. Finally `env.js` is imported inside `index.html` which will replace all environment variables in respective environment like `staging`, `production` etc.
<br/>
`Note:` Setting up environment variable is for docker environment.

## ❯ Environments

There five environments files added inside environment folder. We will build the project with specific environment `ng build --configuration staging`

- [environment]
- [environment.prod]
- [environment.staging]
- [environment.test]
- [environment.develop]

## ❯ Access Token and Refresh Token Strategy

There is a global interceptor added inside core module, where access-token is being added on each request. If access-token is expired, a request to refresh the token will be executed which will update the access token and refresh token.
