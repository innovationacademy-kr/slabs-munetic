import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { options } from './swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { router } from './routes';
import { Models } from './models';
import errorHandler from './modules/errorHandler';
import passport from 'passport';

const app: express.Application = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:2424',
    credentials: true,
    exposedHeaders: 'Authorization',
  }),
);
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api', router);

/**
 * Swagger 연결
 */
const specs = swaggerJSDoc(options);
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
