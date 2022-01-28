FROM node:16.11.1

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
# Wildcard copies package.json and package-lock.json
COPY package*.json ./

RUN npm install yarn

# Will uncomment this later for production only
# RUN yarn install --production

RUN rm package-lock.json

RUN yarn

# Bundle app source code
COPY . .

RUN yarn build:prod

CMD [ "yarn", "start:prod"]

