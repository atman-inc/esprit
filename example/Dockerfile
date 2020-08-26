FROM node:10

RUN mkdir /esprit
ENV APP_ROOT /esprit
ENV PATH $PATH:./node_modules/.bin
WORKDIR $APP_ROOT

RUN npm install

EXPOSE 3000
