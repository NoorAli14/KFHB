FROM node:12.11.1 AS builder
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# For the production environment COPY to Nginx webserver document root
FROM nginx:1.18-alpine

RUN apk add --no-cache bash libbz2 libgcrypt libgd libjpeg-turbo libpng libssl1.1 libcrypto1.1 libxml2 libxslt musl-utils musl

RUN chmod 000 /etc/passwd && chmod 000 /etc/shadow && chmod 000 /etc/group
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
RUN chown -R nginx:nginx /var && chown -R nginx:nginx /etc && chown -R nginx:nginx /usr
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 8080
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
RUN apk add --no-cache bash
RUN chmod +x env.sh
USER nginx
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
