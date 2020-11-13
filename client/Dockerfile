# pull from official base image
FROM node:alpine AS build

# set base working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install
COPY . .

# build the app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]