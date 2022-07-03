FROM node:16

WORKDIR /usr/src/app

COPY certs certs 
COPY apps/ask-the-world-api/package.json .
COPY apps/ask-the-world-api/yarn.lock .
COPY apps/ask-the-world-api/nodemon.json .
COPY apps/ask-the-world-api/tsconfig.json .
COPY apps/ask-the-world-api/env env

RUN yarn
