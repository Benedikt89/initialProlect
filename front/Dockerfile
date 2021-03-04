FROM node:12-alpine as builder
WORKDIR /front
COPY package.json /front/package.json
RUN npm install --only=prod
COPY . /front
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /front/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]