FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 5001

CMD ["yarn", "tsx", "src/main/index.ts"]

