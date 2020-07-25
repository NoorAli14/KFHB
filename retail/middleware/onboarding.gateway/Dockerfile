# ################################################################
# Docker file for wrapping nodejs service components
# Copyright 2020-21 AionDigital
# ################################################################

# Will remain same for all containers.
# Version will be changed during CI/CD process
LABEL maintainer="AionDigital"
LABEL version="0.1.0 (alpha)"
LABEL description="Container for running rubix boilerplate"

# Define default arguments
ARG PORT=4000
ARG WORKDIR=/home/aiondigital/rubix
ARG USER=rubix
ARG NODE_VERSION=12.18.2
ARG NODE_ENV=production

# Define timezone environment variables
ENV TZ=UTC

#===========================================
# Build Stage
#===========================================

# Using latest LTS version running on alpine
FROM node:${WORKDIR}-alpine AS builder
WORKDIR ${WORKDIR}
COPY package*.json ./

# Provide require authorities and run npm install
RUN chown -R $USER:$USER ${WORKDIR} && \
    chmod 770 -R ${WORKDIR} && \
    npm install && npm install --only=dev

# Copy local code to the container image.
COPY . .

# Build
RUN npm run build:prod

# Remove the devDependencies
RUN npm prune --production

# Remove folders after successfully build
#RUN rm -rf app bin config lib utilities

#===========================================
# Master Stage
#===========================================

# Using latest LTS version running on alpine
FROM node:${WORKDIR}-alpine

# Set container timezone
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Strict file permission for passwd, shadow and group files
RUN chmod -R 644 /etc/passwd && \
    chown root:root /etc/shadow && \
    chmod 000 /etc/shadow && \
    chmod -R 644 /etc/group

# Define Working Directory
WORKDIR ${WORKDIR}

# Set user node for future commands
USER $USER

# Copy files from build stage to current working directory
COPY --from=builder ${WORKDIR} ./

# Setting environemnt variables
# These variables will be different from application to application
ENV ENV_RBX_HOST=${PORT} \
    NODE_ENV=${NODE_ENV} \
    ENV_RBX_APP_NAME="Rubix boilerplate"  \
    ENV_RBX_API_URL_PREFIX="/api/v1/" \
    ENV_RBX_HOST="http://localhost" \
    ENV_CDT_AUTHORITY_HOSTNAME= \
    # Swagger Environment Variables
    ENV_RBX_SWAGGER_ENABLED= \
    ENV_RBX_SWAGGER_ROUTE=

# Expose API port    
EXPOSE ${PORT}

# Run the web service on container startup.
CMD npm run start:prod
