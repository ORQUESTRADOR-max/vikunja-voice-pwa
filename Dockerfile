FROM nginx:alpine
COPY . /usr/share/nginx/html

# Script to inject env var into config.json before starting nginx
CMD echo "{\"N8N_WEBHOOK_URL\":\"$N8N_WEBHOOK_URL\"}" > /usr/share/nginx/html/config.json && nginx -g 'daemon off;'
EXPOSE 80
