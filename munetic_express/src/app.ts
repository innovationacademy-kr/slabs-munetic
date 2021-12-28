import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { options } from './swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { router } from './routes';
import { Models } from './models';
import errorHandler from './modules/errorHandler';

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

/**
 * MariaDB 테이블 연결
 */
Models()
  .sync({ force: true })
  .then(() => {
    app.emit('dbconnected');
    console.log('👍 Modeling Successed');
  })
  .catch(err => console.log(err, '🙀 Modeling Failed'));

/**
 * 에러 핸들링
 */
app.use(errorHandler);
export default app;
