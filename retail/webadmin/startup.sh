echo "Script started ..."
echo "ENV_CDT_API_BASE_URL = ${ENV_CDT_API_BASE_URL}"
echo "ENV_CDT_WEB_CHANNEL_ID = ${ENV_CDT_WEB_CHANNEL_ID}"
envsubst < "/usr/share/nginx/html/assets/env.template.js" > "/usr/share/nginx/html/assets/env.js"
nginx -g 'daemon off;'