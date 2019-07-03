FROM node:10-stretch

WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json  .

RUN yarn install --production

COPY . /usr/src/app

CMD ["npm", "start-deploy"]
