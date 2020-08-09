FROM nginx:1.19.1-alpine
LABEL maintainer="emilio@ociotec.com"

WORKDIR /usr/share/nginx/html

COPY index.html tetris.css src/*.js images/*.png sounds/*.mp3 ./
