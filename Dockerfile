FROM node:20.9.0 as stg1
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]