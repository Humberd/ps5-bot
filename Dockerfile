FROM node:14.15-alpine as builder

WORKDIR /usr/app/ps5-bot
COPY ./package.json ./package-lock.json ./
RUN npm set progress=false
RUN npm ci
COPY . .
RUN npm run build

# -----------

FROM node:14.15-alpine

WORKDIR /usr/app/ps5-bot
COPY --from=builder /usr/app/ps5-bot/build build
COPY --from=builder /usr/app/ps5-bot/node_modules node_modules

ENTRYPOINT ["node", "./build/main/index.js"]
