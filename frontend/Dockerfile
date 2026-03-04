FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias primero (para cachear la capa de Docker)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del proyecto
COPY . .

EXPOSE 5173

# Modo desarrollo: --host expone Vite a la red del contenedor
CMD ["npm", "run", "dev", "--", "--host"]
