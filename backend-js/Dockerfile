FROM node:20-slim

# Install OpenSSL required by Prisma
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate prisma client during build just in case
RUN npx prisma generate || true

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
