FROM node:16.2-alpine@sha256:2a658af97ff6d31f7487c6f54d65875770274428b604c949bd54e4f439a083f5
LABEL maintainer="Jonathan Adami <pitilezard@gmail.com>"

COPY ./docker/entrypoint /entrypoint

RUN mkdir /app /db \
  && yarn global add nodemon \
  && chmod +x /entrypoint

COPY . /app
WORKDIR /app

VOLUME [ "/db", "/app/node_modules" ]
ENTRYPOINT [ "/entrypoint" ]