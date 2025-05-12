FROM node:20

WORKDIR /app

COPY package.json ./
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/
COPY backend/prisma backend/prisma

RUN yarn install

COPY . .

RUN yarn build

CMD node backend/dist/src/main.js

