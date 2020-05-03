FROM node:12-buster

WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json  .

RUN yarn install --production

COPY . /usr/src/app

CMD ["npm", "start"]
