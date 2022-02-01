FROM node:16.11.1

# Set environment
ARG token

# Create app directory
WORKDIR /usr/src/app

# Create env file
RUN echo TOKEN=${token} >> .env

# Install dependencies
# Wildcard copies package.json and package-lock.json
COPY package*.json ./

RUN npm install yarn

# Will uncomment this later for production only
# RUN yarn install --production

RUN rm package-lock.json

RUN yarn --production=true

# Bundle app source code
COPY . .

RUN yarn build:prod

CMD [ "yarn", "start:prod"]

