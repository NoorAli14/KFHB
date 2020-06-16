
<h1 align="center">Angular Boilerplate</h1>
<br />

![divider](./divider.png)

## ❯ Table of Contents

- [Local Setup](#-local-setup)
- [Docker setup](#-docker-setup)
- [Folder Structure](#-folder-structure)

![divider](./divider.png)

## ❯ Local Setup

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## ❯ Docker Setup

## Build Image

Run `docker build . -t image-name` to build the image. 

## Run Image

Run `docker run -p 4200:4200 image-name` to build the image. Navigate to `http://localhost:4200/`.

## ❯ Folder Structure

### Auth

Auth folder contain all the components related to authentication including `Login`, `Register`, `Forget Password` and `Reset Password`.

### Core

Anything we need the single instance in our application including `components`, `services`, `pipes` or `directives` we used to create in Core folder.

### Error

All the routing error pages including `404` and `500` we create in Error folder.

### Feature

This folder has all the features of our application. This folder has a `feature.module`, all the features of the application are registered in this module.

### Shared

All shared `components`, `directive`, `services` and `modules` are created in shared folder.

## ❯ API Calling Mechanism

### Feature Level HTTP Service

Each feature has its own HTTP service, which calls the global generic HTTP service which act as a middleware to interact with backend.

### Global HTTP Service

There is a generic HTTP service `Network Service` which has all the HTTP generic methods. Each feature calls these methods to interact with backend.
