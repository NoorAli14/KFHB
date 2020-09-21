FROM nginx:alpine

COPY ./nginx/entrypoint-nginx.sh /

RUN set -ex && \
	apk add --no-cache bash && \
	chmod +x /entrypoint-nginx.sh

COPY ./nginx/domain.conf /etc/nginx/conf.d/vhost.template

CMD [ "/bin/bash", "/entrypoint-nginx.sh"]