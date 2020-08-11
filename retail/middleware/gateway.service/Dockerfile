FROM nginx:alpine

COPY ./config/entrypoint-nginx.sh /

RUN set -ex && \
	apk add --no-cache bash && \
	chmod +x /entrypoint-nginx.sh

COPY ./config/domain.conf /etc/nginx/conf.d/vhost.template

CMD ["/entrypoint-nginx.sh"]