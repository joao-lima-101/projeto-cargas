FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "chmod -R +x node_modules/.bin/prisma node_modules/prisma && npx prisma migrate dev --name init && npm run dev"]