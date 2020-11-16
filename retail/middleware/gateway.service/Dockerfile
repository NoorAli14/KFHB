FROM nginx:alpine

RUN apk add openssl 'libxml2=2.9.10-r3'
RUN mkdir -p /etc/nginx/domainssl /etc/nginx/localhostssl
ADD certs/fullchain.pem /etc/nginx/domainssl/domain.crt
ADD certs/private.key /etc/nginx/domainssl/domain.key

# copying default nginx configs
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/site.conf /etc/nginx/conf.d/default.conf

ADD nginx/domain.conf /etc/nginx/conf.d

RUN touch /var/run/nginx.pid /var/log/nginx/access.log /var/log/nginx/error.log && chown -R nginx:nginx /var/run/nginx.pid && chown -R nginx:nginx /var/cache/nginx && chown  nginx:nginx /var/log/nginx/access.log && chown nginx:nginx /var/log/nginx/error.log && chown -R nginx:nginx /etc/nginx/ && chmod 600 /etc/passwd && chmod 600 /etc/shadow && chmod 600 /etc/group

EXPOSE 8080/tcp 8443/tcp

#ENV HOST_NAME=""

WORKDIR /usr/share/nginx/html

USER nginx

CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]