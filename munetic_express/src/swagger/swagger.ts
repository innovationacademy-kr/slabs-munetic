import { development } from '../config/config';

export const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'MUNETIC API',
      version: '1.0.0',
    },
    host: development.domain,
    basePath: '/api',
  },
  apis: ['./src/swagger/apis/*.yml', './src/swagger/definitions.yml'],
};
