# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Expose ports for Node.js app and Kafka
EXPOSE 3000
EXPOSE 9092

# Command to run the application
CMD ["npm", "start"]
