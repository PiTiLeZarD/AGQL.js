FROM node:16.2-alpine
LABEL maintainer="Jonathan Adami <pitilezard@gmail.com>"

RUN mkdir /app /db \
  && yarn global add nodemon

COPY . /app

WORKDIR /app
VOLUME [ "/db" ]

RUN yarn install