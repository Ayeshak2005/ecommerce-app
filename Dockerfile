# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend/package.json and install dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy the rest of the backend and frontend code
WORKDIR /app
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Expose port
EXPOSE 5000

# Start the server
WORKDIR /app/backend
CMD ["node", "server.js"]

