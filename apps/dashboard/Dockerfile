FROM node:16

ENV NODE_ENV production

WORKDIR /app

COPY ./dist/apps/dashboard/package.json /app/

RUN yarn --production

COPY ./dist/apps/dashboard /app/

CMD yarn start

