# Step 1: Build the app in image 'builder'
FROM node:10.16-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run build

# Step 2: Use build output from 'builder'
FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/customer-ui /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst </usr/share/nginx/html/assets/settings.template.json> /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]