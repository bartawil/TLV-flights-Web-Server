FROM node:18-alpine


# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install

# Copy app source code
COPY . .

EXPOSE 8080

# Command to run the app
CMD ["npm", "start"]