FROM node:latest as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

# RUN npm ci --only=production

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build