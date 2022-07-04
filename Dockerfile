FROM node:16

WORKDIR /usr/src/app

COPY certs ../certs
COPY apps/ask-the-world-api .

RUN yarn install
