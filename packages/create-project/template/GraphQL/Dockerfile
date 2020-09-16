FROM node:10

ENV APP_ROOT /<%= name %>
RUN mkdir $APP_ROOT
ENV PATH $PATH:$APP_ROOT/node_modules/.bin
WORKDIR $APP_ROOT

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

ADD . .

EXPOSE 4000