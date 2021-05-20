FROM node:16.2-alpine
LABEL maintainer="Jonathan Adami <pitilezard@gmail.com>"

RUN mkdir /app \
  && yarn global add nodemon

COPY . /app

WORKDIR /app

RUN yarn install