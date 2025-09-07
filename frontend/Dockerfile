# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Run
EXPOSE 3000
ENV HOST=0.0.0.0
CMD ["npm","run","start","--","-p","3000","-H","0.0.0.0"]
