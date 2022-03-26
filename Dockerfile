FROM node:16.11.1 AS build

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
# Wildcard copies package.json and package-lock.json
COPY package*.json ./

COPY . .

RUN npm install yarn

RUN rm package-lock.json

RUN yarn --production=true

RUN yarn build:prod

RUN npm prune --production

RUN /usr/local/bin/node-prune

FROM node:16.11.1-alpine

WORKDIR /usr/app

COPY --from=build /usr/src/app/dist .

COPY --from=build /usr/src/app/node_modules ./node_modules

RUN apk add --no-cache bash

CMD [ "node", "app/app.js" ]
