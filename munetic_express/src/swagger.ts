export const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'MUNETIC API',
      version: '1.0.0',
    },
    host: 'munetic.dev.42cadet.kr/',
    basePath: '/api',
  },
  apis: ['./src/swagger.yml'],
};
