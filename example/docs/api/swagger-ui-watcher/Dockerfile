FROM node:12.13.0-alpine

WORKDIR /usr/src/app

ADD package.json yarn.lock ./
ADD cmd ./cmd
RUN yarn

EXPOSE 8000
