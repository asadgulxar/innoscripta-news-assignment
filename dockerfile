# Use Node.js as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# Copy built files to Nginx's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web access
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
