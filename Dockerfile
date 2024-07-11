FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/tc_v1_fe /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY replace-env.sh /docker-entrypoint.d/

RUN chmod +x /docker-entrypoint.d/replace-env.sh

ENTRYPOINT ["/docker-entrypoint.d/replace-env.sh"]
CMD ["nginx", "-g", "daemon off;"]