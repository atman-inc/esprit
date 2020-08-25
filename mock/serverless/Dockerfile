FROM node:10

RUN mkdir /esprit

ENV APP_ROOT /esprit
WORKDIR $APP_ROOT

RUN npm i
ENV PATH $PATH:$APP_ROOT/node_modules/.bin
