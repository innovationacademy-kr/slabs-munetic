FROM nginx:1.21.4

ENV DEBIAN_FRONTEND noninteractive

RUN mkdir -p /var/www/letsencrypt/.well-known/acme-challenge
RUN apt-get update && apt-get install -y cron letsencrypt
RUN echo "00 00 1 */2 * certbot renew" >> /etc/crontab

COPY init-script.sh /init-script.sh

CMD [ "/init-script.sh" ]
