FROM mariadb:10.6.5-focal
ARG EXPRESS_USER
ARG EXPRESS_PASSWORD
RUN echo "CREATE USER IF NOT EXISTS '${EXPRESS_USER}'@'%' IDENTIFIED BY '${EXPRESS_PASSWORD}'; \
    CREATE DATABASE munetic; \
    GRANT ALL PRIVILEGES ON munetic.* TO ${EXPRESS_USER};" \
    > /docker-entrypoint-initdb.d/init.sql
RUN chmod 755 /docker-entrypoint-initdb.d/init.sql
