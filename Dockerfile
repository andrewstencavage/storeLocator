#Running with NodeJS version 12
FROM node:12
#Set working directory of the app
WORKDIR /usr/src/app
#Copy package.json files to working directory
COPY package*.json ./
#Install NPM packages
RUN npm install
#Copy the rest of the files 
COPY . .
#Expose port 3000 to the docker host
EXPOSE 3000
#Start the NodeJS application
CMD [ "node", "server.js" ]
