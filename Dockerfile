

# Step 2: Use build output from 'builder'
FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/share/nginx/html
CMD ["/bin/sh",  "-c",  "envsubst </usr/share/nginx/html/assets/settings.template.json> /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]