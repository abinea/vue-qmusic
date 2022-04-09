FROM node:17
COPY ./ /vue-next-music
WORKDIR /vue-next-music
RUN npm install pnpm -g
RUN pnpm install && pnpm run build

FROM nginx
RUN mkdir /vue-next-music
COPY --from=0 /vue-next-music/dist /vue-next-music
COPY nginx.conf /etc/nginx/nginx.conf
