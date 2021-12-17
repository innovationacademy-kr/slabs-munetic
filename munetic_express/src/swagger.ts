const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Service with Swagger',
      version: '1.0.0',
      description: 'Munetic Rest api ver.01',
    },
    servers: [
      {
        url: 'http://localhost:3030',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};
export default options;
