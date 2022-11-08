FROM node:18 AS app
# Install dumb-init to handle signals properly
RUN apt update && apt install -y --no-install-recommends dumb-init
# Set environment variables
ENV NODE_ENV=production
# Create app directory
WORKDIR /usr/src/app
# Copy the source code into the container app directory, and set the owner to the node user
COPY --chown=node:node . .
# Install dependencies - need dev dependencies for building
RUN NODE_ENV=development npm install
# Build the app
RUN npm run build
# Change to the node image non-root user
USER node
# Expose port within the Docker container (mainly informational, docker compose should map this to a port on the host)
EXPOSE 4000
# Serve the app - directly invoke it with node so that it can be stopped with SIGINT
CMD ["dumb-init", "node", "dist/server.js"]
