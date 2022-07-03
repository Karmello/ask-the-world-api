FROM node:16

# Create app directory
WORKDIR /usr/src/api

COPY package.json .
COPY yarn.lock .
COPY nodemon.json .
COPY tsconfig.json .
COPY env env
COPY src src

RUN yarn

EXPOSE 9000
CMD [ "yarn", "start-local" ]
