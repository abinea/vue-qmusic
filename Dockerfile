FROM nginx
RUN mkdir /vue-next-music
RUN mkdir /backend
COPY backend /backend
COPY dist /vue-next-music
COPY nginx.conf /etc/nginx/nginx.conf
COPY sources.list /etc/apt/sources.list
ADD docker-entrypoint.sh /backend
RUN apt update -y && \
  apt upgrade -y && \
  apt install --fix-missing -y nodejs npm

WORKDIR /backend
RUN npm config set registry https://registry.npmmirror.com/ && npm install
