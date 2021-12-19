FROM node:16
RUN mkdir munetic_admin
WORKDIR /munetic_admin
COPY . .
RUN npm i esbuild
RUN npm i
CMD [ "npm", "run", "dev" ]
