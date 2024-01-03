FROM node:16-alpine

ENV PORT=3005
ENV REQUESTS_PER_BATCH=5
ENV BASE_URL='https://randomuser.me/api/?results=10'
ENV QUEUE_NAME='data-fetch-queue'
ENV REDIS_PORT=6379

WORKDIR /server

COPY ./package-lock.json ./package.json ./tsconfig.json ./

RUN npm install

COPY . .

CMD npm start

