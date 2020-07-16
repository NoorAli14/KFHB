
# ################################################################
# Docker file for wrapping angular web portal
# Copyright 2019-20 AionDigital
# ################################################################


# ###################################
# Stage 01: Building angular webapp
# ###################################

FROM node:alpine as nodeBuild

LABEL maintainer="AionDigital"
LABEL version="0.1.0 (alpha)"
LABEL description="Container for running web admin"

WORKDIR /app

COPY package.json ./

RUN rm -rf node_modules package-lock.json

RUN npm cache clean --force


RUN npm install --silent

COPY . .

RUN npm run build:prod

# Remove the devDependencies
RUN npm prune --production

# ###################################
# Stage 02: Copying angular build (dist) in nginx
# ###################################

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf ./etc/nginx/conf.d/default.conf
COPY --from=nodeBuild /app/dist /usr/share/nginx/html

EXPOSE 4200

## startup.sh script is launched at container run
ADD ./startup.sh ./startup.sh

ENTRYPOINT ["sh", "./startup.sh"]










