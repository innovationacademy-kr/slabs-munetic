import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { options } from './swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { router } from './routes';
import { DatabaseInit } from './models';
import * as lesson from './routes/lesson.routes';
import { simpleTest } from './simpletest';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

/**
 * Swagger 연결
 */
const specs = swaggerJSDoc(options);

/**
 * MariaDB 연결 init함수 호출
 */

DatabaseInit();

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

app.use(lesson.path, lesson.router);

app.listen(3030, () =>
  console.log(`=============
🚀 App listening on the port 3030
============`),
);

// simpleTest();
