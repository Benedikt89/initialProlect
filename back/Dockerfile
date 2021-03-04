FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json

# Copy source
COPY . ./app

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install

# Build dist
RUN npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --only=prod
# Expose port 8080
EXPOSE 8080
USER node
CMD npm run start