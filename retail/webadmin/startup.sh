echo "Script started ..."

# envsubst < "/usr/share/nginx/html/assets/env.template.js" > "/usr/share/nginx/html/assets/env.js"
nginx -g 'daemon off;'