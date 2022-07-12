# syntax=docker/dockerfile:1

FROM node:16-alpine
# ENV NODE_ENV=development
ENV ENV=local
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN [ "npm", "install", "--production" ]

COPY . /app

RUN ["npm", "install", "typescript"]
RUN ["npx", "tsc"]

RUN [ "mv", "./assets",  "./dist/assets" ]

# CMD ls dist/src
CMD [ "node", "dist/index.js" ]