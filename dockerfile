FROM node:18 AS app
# Install dumb-init to handle signals properly
RUN apt update && apt install -y --no-install-recommends dumb-init
# Set environment variables
ENV NODE_ENV=production
# Create app directory
WORKDIR /usr/src/app
# Copy the source code into the container app directory
COPY --chown=node:node . .
# Install dependencies - need dev dependencies for building
RUN NODE_ENV=development npm install
# Build the app
RUN npm run build
# Change to the node image non-root user - must be done after pruning to prevent permission errors
USER node
# Serve the app - directly invoke it with node so that it can be stopped with SIGINT
CMD ["dumb-init", "node", "dist/server.js"]
