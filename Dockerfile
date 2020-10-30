# Step 1: Build the app in image 'builder'
FROM node:12.19-alpine3.10 AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run build

# Step 2: Use build output from 'builder'
FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/wwwroot/ .
CMD ["/bin/sh",  "-c",  "envsubst </usr/share/nginx/html/assets/settings.template.json> /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]