# starting an basic node image with using env variable to set the node environment

FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .


EXPOSE 8000

CMD ["npm", "start"]
