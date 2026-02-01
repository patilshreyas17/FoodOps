# Stage 1: Build the Vite React application
FROM node:20-alpine AS build

WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_API_URL
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_RAPID_API_KEY

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create .env file from build arguments
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env && \
    echo "VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}" >> .env && \
    echo "VITE_RAPID_API_KEY=${VITE_RAPID_API_KEY}" >> .env

# Build the app (Vite outputs to 'dist' directory)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
