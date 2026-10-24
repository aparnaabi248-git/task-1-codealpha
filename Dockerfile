# ==============================================================================
# CodeAlpha DevOps Internship - Task 1: Containerization Dockerfile
# Base Image: Lightweight Node.js 20 on Alpine Linux
# ==============================================================================
FROM node:20-alpine

# Set metadata labels for container governance
LABEL maintainer="CodeAlpha DevOps Intern"
LABEL description="Containerized Node.js Web Application for Azure DevOps CI/CD"
LABEL project="CodeAlpha Task 1"

# Create application directory inside the container
WORKDIR /usr/src/app

# Set production environment variable
ENV NODE_ENV=production
# Default port for Azure App Service Linux containers
ENV PORT=80

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies (clean and fast)
RUN npm ci --only=production && npm cache clean --force

# Copy application source code and public assets
COPY src/ ./src/
COPY public/ ./public/

# Use non-privileged built-in 'node' user for security
USER node

# Expose container application port
EXPOSE 80

# Health check to ensure the container is alive
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start command
CMD ["node", "src/index.js"]
