# 1. Etapa de compilación
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Servir con un servidor web ligero (Nginx) o dejarlo listo para desarrollo/preview
FROM node:24-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]