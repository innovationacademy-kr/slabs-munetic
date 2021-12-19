FROM node:16
RUN mkdir munetic_app
WORKDIR /munetic_app
COPY . .
RUN npm i esbuild
RUN npm i
CMD [ "npm", "run", "dev" ]
