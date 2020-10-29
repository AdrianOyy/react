# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:12.18.2-alpine as builder

FROM nginx

RUN mkdir /usr/share/nginx/sense

RUN rm -rf /etc/nginx/conf.d

COPY ./conf.d /etc/nginx/conf.d

COPY ./sense /usr/share/nginx/sense

RUN chmod -R 777 /usr/share/nginx/sense

EXPOSE 80

COPY env.sh /

CMD ["sh", "env.sh"]


