# Step 1: Build the app in image 'builder'
FROM node:lts-alpine3.16 AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm install -g npm@9.6.6
RUN npm ci && npm run build

# Step 2: Use build output from 'builder'
FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/arytic-app /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst </usr/share/nginx/html/assets/settings.template.json> /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]
