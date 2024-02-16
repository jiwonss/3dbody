FROM node:20.10.0 as builder

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH

COPY . .

RUN npm install
RUN npm install react-scripts@3.0.1 -g

CMD ["npm", "run", "dev"]
EXPOSE 3000