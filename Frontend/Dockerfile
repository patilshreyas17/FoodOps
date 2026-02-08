
FROM node:20-alpine AS build

WORKDIR /app


ARG VITE_API_URL
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_RAPID_API_KEY


COPY package.json package-lock.json ./


RUN npm ci


COPY . .


RUN echo "VITE_API_URL=${VITE_API_URL}" > .env && \
    echo "VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}" >> .env && \
    echo "VITE_RAPID_API_KEY=${VITE_RAPID_API_KEY}" >> .env


RUN npm run build


FROM nginx:stable-alpine


COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template


COPY nginx-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh


COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80


ENTRYPOINT ["/docker-entrypoint.sh"]
