FROM node:17
RUN mkdir munetic_app
WORKDIR /munetic_app
COPY . .
RUN npm i
CMD [ "npm", "run", "dev" ]