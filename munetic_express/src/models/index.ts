import { Sequelize } from "sequelize";
import { config } from "../config/config";
import { Category } from "./category";

const { db } = config.development;

const { host, port, database, username, password } = db as {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

// sequelize 인스턴스 생성
// config에 정의된 환경변수 값을 여기서 사용합니다.
export const sequelize = new Sequelize(database!, username!, password, {
  host,
  port,
  dialect: "mariadb",
  dialectOptions: {
    charset: "utf8mb4",
  },
  timezone: "+09:00", //mysql은 utc기준이라 한국시간 계산할 때 9시간 더해줬는데 mariadb는 모르겠네요. 날짜 형태도 'YYYY-MM-DD'와 같은 형태로 들어가지 않는다면 moment같은 외부 모듈로 날짜 형태 잡아줘야할 것 같아요.
  define: {
    timestamps: true, //timestamps를 사용하면 자동으로 createdAt, updatedAt컬럼이 추가되고 로우가 추가되거나 수정될떄 자동으로 컬럼을 채워줍니다.
    deletedAt: true, //deletedAt을 사용하면 destroy쿼리를 실행했을 때 deletedAt값이 자동으로 생성됩니다.(soft 삭제), 진짜 로우를 삭제하고 싶다면(hard삭제)쿼리 넘길떄 force:true라는 옵션을 추가해야합니다. 하드 삭제할 일은 없겠쥬...
    paranoid: true, //soft 삭제기능, deletedAt을 사용하기 위해선 이 옵션 필요
  },
});

sequelize // 생성된 sequelize 인스턴스가 db랑 연결됐는지를 테스팅 하는 코드입니다. 연결에 성공해도 모델 생성에서 에러 날 수 있습니다.
  .authenticate()
  .then(() => console.log("db connected🚀"))
  .catch((err) => console.log("db failed🙀", err));

export function models() {
  // 이 함수 안에 생성한 모델의 initModel 메소드를 실행시켜주세요.
  // app.ts에서 models()함수를 불러 테이블을 한번에 생성합니다.

  Category.initModel(sequelize);
  // ex) Users.initModel(sequelize);
  // ex) Lessons.initModel(sequelize);
  return sequelize;
}
