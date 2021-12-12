import express, { Request, Response } from 'express';
import { models } from './models';
const app: express.Application = express();

models() //models/index.ts에 정의한 models함수입니다.
  .sync({ force: true }) // force:true는 서버 껐다 킬때마다 테이블을 싹 새로 만들어요. 프로덕션때는 반드시 false해야합니다.  지금 개발 환경이라 true가 편해서 true로 해놨어요.
  .then(() => {
    console.log('👍 Modeling Successed'); // 이 표시 나오면 mariadb에서 테이블이 성공적으로 생성된 것을 확인할 수 있습니다.
  })
  .catch(err => console.log(err));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(3030);
