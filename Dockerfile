FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Se você usar npm:
RUN npm install

# Se usar pnpm/yarn, adapta aqui

COPY . .

# Build da aplicação
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
