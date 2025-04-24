FROM node:20 as dev

WORKDIR /app

ARG env

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "start:dev" ]