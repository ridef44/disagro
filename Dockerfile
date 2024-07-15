# Usa una imagen base oficial de Node.js en la versión 21.7.2.
FROM node:21.7.2-alpine

# Establece el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo.
COPY package*.json ./

# Instala las dependencias del proyecto.
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo.
COPY . .

# Compila el código TypeScript a JavaScript.
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación.
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
