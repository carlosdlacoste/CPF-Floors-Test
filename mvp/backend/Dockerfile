# 1. Usar una imagen oficial de Node.js ligera
FROM node:24-alpine AS builder

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar dependencias
COPY package*.json ./
RUN npm install

# 4. Copiar el código fuente y compilar
COPY . .
RUN npm run build

# 5. Imagen de producción limpia
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]