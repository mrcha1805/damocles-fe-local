FROM node:14.15.0-alpine

ENV TZ=Asia/Bangkok
RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates
RUN apk add --update tzdata
RUN rm -rf /var/cache/apk/*

ARG mode

WORKDIR /app/actionable-insight-fe
COPY . .

WORKDIR /app/actionable-insight-fe
RUN npm install
RUN npm run ${mode}

CMD node server.js
