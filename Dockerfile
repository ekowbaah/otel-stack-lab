FROM node:22.20.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY services ./services
USER node
CMD ["npm","start"]
