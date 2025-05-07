# syntax=docker/dockerfile:1

# 1) Base image with Node & pnpm
ARG NODE_VERSION=21.7.3
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Astro"
WORKDIR /app
ENV NODE_ENV=production

ARG PNPM_VERSION=10.8.1
RUN npm install -g pnpm@${PNPM_VERSION}

# 2) Build stage
FROM base AS build

RUN apt-get update -qq \
 && apt-get install --no-install-recommends -y \
      build-essential \
      node-gyp \
      pkg-config \
      python-is-python3 \
 && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
RUN pnpm prune --prod

RUN chmod +x trellis.sh 
RUN ./trellis.sh
RUN pwd && ls

# 3) Final image: Caddy
FROM caddy:2.7.4-alpine

# Copy built files into Caddy's default web root (/srv)
COPY --from=build --chown=caddy:caddy /app/dist /srv

# Copy your Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile
COPY redirects.caddyfile /etc/caddy/redirects.caddyfile

EXPOSE 80

# Caddy will read /etc/caddy/Caddyfile by default
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]