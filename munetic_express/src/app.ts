import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { options } from './swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { router } from './routes';
import { Models } from './models';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
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
    console.log('👍 Modeling Successed');
  })
  .catch(err => console.log(err, '🙀 Modeling Failed'));

app.listen(3030, () =>
  console.log(`=============
🚀 App listening on the port 3030
============`),
);
