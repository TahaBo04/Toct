FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Run
EXPOSE 3000
CMD ["npm","start"]
