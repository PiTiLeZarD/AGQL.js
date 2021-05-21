FROM node:16.2-alpine
LABEL maintainer="Jonathan Adami <pitilezard@gmail.com>"

COPY ./docker/entrypoint /entrypoint

RUN mkdir /app /db \
  && yarn global add nodemon \
  && chmod +x /entrypoint

COPY . /app
WORKDIR /app

VOLUME [ "/db", "/app/node_modules" ]
ENTRYPOINT [ "/entrypoint" ]