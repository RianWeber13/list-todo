# Versão final e corrigida do web/Dockerfile

FROM node:20-alpine 

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Comando final para iniciar o servidor
CMD ["npm", "run", "dev"]