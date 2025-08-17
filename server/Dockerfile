FROM node:20-alpine as base
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN npm i --legacy-peer-deps || yarn || pnpm i
COPY . .
RUN npm run build || yarn build || pnpm build
CMD ["node", "dist/index.js"]
