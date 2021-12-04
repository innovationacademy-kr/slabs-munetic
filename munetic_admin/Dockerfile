FROM node:17
RUN mkdir munetic_admin
WORKDIR /munetic_admin
COPY . .
RUN npm i
CMD [ "npm", "run", "dev" ]