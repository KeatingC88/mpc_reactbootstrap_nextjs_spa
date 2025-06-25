# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only what's necessary to install
COPY package*.json ./
COPY tsconfig.json ./
COPY next-env.d.ts ./

# Copy the rest of the source
COPY . .

# Build the Next.js app
RUN npm install
RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed to run
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app and public assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
