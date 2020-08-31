FROM node:10

RUN mkdir /esprit
ENV APP_ROOT /esprit
ENV PATH $PATH:./node_modules/.bin
ENV NODE_CONFIG_DIR /esprit/lib/config
WORKDIR $APP_ROOT

RUN npm install

EXPOSE 3000
