import { sequelize } from "./index";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

//카테고리 테이블 속성 타입 지정
interface categoryAttributes {
  id: number;
  name: string;
}

// 쿼리 넘길때 있을 수도 있고 없을 수도 있는 속성, 또는 nullable 한 속성은 optional로 지정해야한다.
// 예를 들어 새 로우를 db에 추가한다고 할때 id값은 전달안해도 db에서 auto Increment로 넣어준다.
// id 없이 name만 쿼리에 전달해도 된다는 뜻. 이렇게 쿼리에서 빠져도 되는 값들(ex.id) 이런 값은 optional로 따로 지정해줘야한다.
// 안하면 무슨일이 생기냐... 쿼리 넘길때 id값 없다고 컴파일 에러 나버림. 타입스크립트는 db에서 자동 처리된다는 것을 모르기 떄문에
type categoryCreationAttributes = Optional<categoryAttributes, "id">;

export class Category
  extends Model<categoryAttributes, categoryCreationAttributes>
  implements categoryAttributes
{
  public id!: number;
  public name!: string;

  static initModel(sequelize: Sequelize): typeof Category {
    // init메소드는 db에 class로 정의한 모델을 바탕으로 테이블을 생성하는 메소드이다.
    // class에서 메소드로 정의안하고 아예 밖으로 빼서 바로 Category.init 메소드를 실행시켜도 됩니다.
    // class내부에 메소드로 정의한 이유는 category.ts :35번째 줄에 모델들을 한데 모아 한번에 실행시키려고 의도했기 때문
    return Category.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
      },
      { tableName: "Category", sequelize }
    );
  }
}
