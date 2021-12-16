import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';

import { Models } from './models';
import { RegisterRoutes } from './routes/routes';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import('./swagger/swagger.json')),
  );
});

/**
 * MariaDB 테이블 연결
 */
Models()
  .sync({ force: true })
  .then(() => {
    console.log('👍 Modeling Successed');
  })
  .catch(err => console.log(err, '🙀 Modeling Failed'));

RegisterRoutes(app);

app.listen(3030, () =>
  console.log(`=============
🚀 App listening on the port 3030
============`),
);
