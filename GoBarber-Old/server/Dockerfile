FROM node:alpine

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean

COPY . ./

EXPOSE 3333
CMD yarn dev ./src/start/server.js
