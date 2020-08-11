
# ################################################################
# Docker file for wrapping nodejs service components
# Copyright 2020-21 AionDigital
# ################################################################

#=================================================================
# Build Stage 1
#=================================================================
# Using latest LTS version running on alpine
FROM node:12.18.3-alpine AS builder

COPY package.json package-lock.json ./

# Install all Dependencies
RUN npm install

COPY . ./

# Build
RUN npm run build

#=================================================================
# Build Stage 2
#=================================================================
# Using latest LTS version running on alpine
FROM node:12.18.3-alpine AS node_modules

COPY package.json package-lock.json ./

# Install production Dependencies
RUN npm install --only=production

#=================================================================
# Master Stage
#=================================================================
# Using latest LTS version running on alpine
FROM node:12.18.3-alpine

# Will remain same for all containers.
# Version will be changed during CI/CD process
LABEL maintainer="AionDigital"
LABEL version="0.1.0 (alpha)"
LABEL description="Container for running rubix boilerplate"

# Define default arguments
ARG PORT=4000
ARG WORKDIR=/home/aiondigital/rubix
ARG USER=node
ARG NODE_ENV=production
ARG TZ=Asia/Bahrain

# Set container timezone
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Strict file permission for passwd, shadow and group files
RUN chmod -R 644 /etc/passwd && \
    chown root:root /etc/shadow && \
    chmod 000 /etc/shadow && \
    chmod -R 644 /etc/group

# Define working directory
WORKDIR $WORKDIR

# Copy dist folder from builder stage
COPY --from=builder dist $WORKDIR/dist

# Copy node_modules folder from node_modules stage
COPY --from=node_modules node_modules $WORKDIR/node_modules

# Copy local code to the working directory.
COPY . $WORKDIR

# Provide require authorities
RUN chown -R $USER:$USER $WORKDIR && \
    chmod 770 -R $WORKDIR

# Remove folders after successfully build
RUN rm -rf src test

# Setting environemnt variables
# These variables will be different from application to application
ENV ENV_RBX_HOST=${PORT} \
    NODE_ENV=${NODE_ENV} \
    ENV_RBX_APP_NAME="Onboarding Business service"  \
    ENV_RBX_API_URL_PREFIX="/api/v1/onboarding" \
    ENV_RBX_HOST="http://localhost" \
    TZ=${TZ} \
    ENV_RBX_SWAGGER_ENABLED="true" \
    ENV_RBX_SWAGGER_ROUTE="/api/v1/onboarding/docs"

# Set user node for future commands
USER $USER

# Expose API port    
EXPOSE ${PORT}

# Run the web service on container startup.
CMD npm run start:prod