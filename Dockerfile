# Utilise l'image NestJS basée sur Node.js
FROM node:20-alpine

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Compiler TypeScript
RUN npm run build

# Lancer l'application en production
CMD ["node", "dist/main.js"]
