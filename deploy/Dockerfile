FROM node:24-bookworm

WORKDIR /usr/src/app

COPY package.json  .

RUN yarn install --production

COPY . /usr/src/app

CMD ["npm", "start"]
