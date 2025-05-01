FROM node:20 AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --no-cache

COPY . .

CMD [ "npm", "run", "start" ]