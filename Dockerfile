FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx @chakra-ui/cli typegen ./src/chakra/config/theme.ts 
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma migrate reset --force && npm start"]