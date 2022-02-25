import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { options } from './swagger/swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { router } from './routes';
import { Models } from './models';
import errorHandler from './modules/errorHandler';
import passport from 'passport';
import UserInit from './models/initdata/user.init'
import CategoryInit from './models/initdata/category.init'
import EtcInit from './models/initdata/etc.init'

const app: express.Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:2424', 'http://localhost:4242'],
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
  '/api/swagger',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

/**
 * MariaDB 테이블 연결
 */
const init: boolean = true; // express가 재시작 될 때 데이터베이스 초기화를 할 지의 여부
Models()
  .sync({ force: init })
  .then(() => {
    app.emit('dbconnected');
    console.log('👍 Modeling Successed');

    if (init) {
      // admin Owner 계정 자동 생성
      UserInit();
      // app category 자동 생성
      CategoryInit();
      // 약관, 라이센스 자동 생성
      EtcInit();
    }
  })
  .catch(err => console.log(err, '🙀 Modeling Failed'));
 

/**
 * 에러 핸들링
 */
app.use(errorHandler);
export default app;
