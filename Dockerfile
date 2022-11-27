FROM node:16.11.1 AS build

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
# Wildcard copies package.json and package-lock.json
COPY package*.json ./

COPY . .

RUN npm install yarn

RUN rm package-lock.json

RUN yarn

RUN yarn build:prod

RUN yarn install --production

FROM node:16.11.1-alpine

WORKDIR /usr/app

COPY --from=build /usr/src/app/dist .

COPY --from=build /usr/src/app/node_modules ./node_modules

RUN apk add --no-cache bash

RUN --mount=type=secret,id=CLIENT_ID \
  --mount=type=secret,id=TOKEN \
   export CLIENT_ID=$(cat /run/secrets/CLIENT_ID) && \
   export TOKEN=$(cat /run/secrets/TOKEN)

CMD [ "node", "app/app.js" ]
