FROM node:alpine

RUN apk add --no-cache bash

EXPOSE 5000

WORKDIR /app

COPY package.json package-lock.json yarn.lock  /app/

RUN npm install

COPY . /app/

COPY /docker/ormconfig.js  /app/ormconfig.js

RUN ["chmod","+x","wait-for.sh"]

ENV TYPEORM_HOST=postgres

ENV TYPEORM_USERNAME=postgres

ENV TYPEORM_PASSWORD=postgres

ENV TYPEORM_DATABASE=postgres

ENV DOCKER_RUN=true

ENV TYPEORM_SSL=false