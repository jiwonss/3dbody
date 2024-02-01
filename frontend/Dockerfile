FROM node:20.10.0 as builder

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH

COPY package.json /front/package.json

RUN npm install

COPY . ./

EXPOSE 3000