FROM nginx
RUN mkdir /vue-qmusic
RUN mkdir /backend
COPY dist /vue-qmusic
COPY backend /backend

COPY nginx.conf /etc/nginx/nginx.conf
COPY sources.list /etc/apt/sources.list

RUN apt update -y && \
  apt upgrade -y && \
  apt install --fix-missing -y nodejs

RUN rm /etc/apt/sources.list

WORKDIR /backend
