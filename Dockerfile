FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:22-alpine AS final

WORKDIR /app

COPY --from=builder /app /app

EXPOSE ${PORT}

CMD [ "npm", "run", "start:cmd" ]


