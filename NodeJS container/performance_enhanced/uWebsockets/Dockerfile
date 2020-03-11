FROM node:current-slim

RUN apt-get update && apt-get install -y git

RUN echo "soft nofile 1024000" >> /etc/security/limits.conf
RUN echo "hard nofile 1024000" >> /etc/security/limits.conf


WORKDIR /usr/src/app
COPY package.json .
RUN npm install uNetworking/uWebSockets.js#v17.3.0 

EXPOSE 9050
CMD [ "npm", "start" ]

COPY . .
