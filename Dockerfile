# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir -p /usr/share/nginx/vue_app
COPY --from=build-stage /app/dist /usr/share/nginx/vue_app
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
# HTTP
EXPOSE 80
# HTTPS
EXPOSE 443
# Backend
EXPOSE 8443
# Web Push Service
EXPOSE 444
