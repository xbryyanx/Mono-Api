FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/src/app.js"]