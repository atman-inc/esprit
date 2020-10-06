FROM node:<%= nodeVersion %>

ENV APP_ROOT /<%= name %>
RUN mkdir $APP_ROOT
ENV PATH $PATH:$APP_ROOT/node_modules/.bin
WORKDIR $APP_ROOT

RUN apt-get update && \
    apt-get -y install git unzip build-essential autoconf libtool
RUN git clone https://github.com/google/protobuf.git && \
    cd protobuf && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install && \
    ldconfig && \
    make clean && \
    cd .. && \
    rm -r protobuf

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

ADD . .

EXPOSE 50051