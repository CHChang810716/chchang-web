FROM node:12

# Create app directory
WORKDIR /usr/src/app

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm install

CMD [ "node", "server.js" ]