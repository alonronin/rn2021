FROM node:16

ENV NODE_ENV production

WORKDIR /app

COPY ./dist/apps/jigglypuff/package.json /app/

RUN yarn --production

COPY ./dist/apps/jigglypuff /app/

CMD yarn start

