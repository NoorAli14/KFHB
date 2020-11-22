# ################################################################
# Docker file for wrapping nodejs service components
# Copyright 2020-21 AionDigital
# ################################################################

# Using latest nginx LTS version running on alpine
FROM nginx:alpine

# copying default nginx configs
COPY ./nginx/domain.conf /etc/nginx/conf.d/default.conf

# Run the nginx service on container startup.
CMD ["nginx", "-g", "daemon off;"]
