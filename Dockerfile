FROM node:20 AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-cache

COPY . .

CMD [ "npm", "run", "start" ]