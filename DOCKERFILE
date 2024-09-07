# Use an official Node runtime as the base image
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


#creates your build folder with the static index.html which will be used 
RUN npm run build

# installs the serve package - lightweight static file serving tool for spa`s. It serves as a webserver which delivers files (like the contents from the previous build step)
RUN npm install -g serve

# container listens on port 8081
EXPOSE 8081

# Runs on container startup - serves the contents of the build folder on port 3000 
CMD ["serve", "-s", "build", "-l", "8081"]

# summa sumarum - jsut build the app, setup a lightweight fileserver and serve the static contents via the fileserver
