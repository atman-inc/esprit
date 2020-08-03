FROM node:10

RUN npm i -g @nestjs/cli
RUN mkdir /esprit

ENV APP_ROOT /esprit
WORKDIR $APP_ROOT

EXPOSE 3000

CMD ['npm', 'run', 'start']
