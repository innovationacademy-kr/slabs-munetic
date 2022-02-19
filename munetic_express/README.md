## 백앤드 (munetic_express)

### build & run
  - TypeSctipt 컴파일러로 빌드를 한 후 node.js로 빌드된 결과물을 실행합니다.
    - 관련 설정은 tsconfig.json에 정의되어 있습니다.
  - tsc 명령으로 빌드가 되어 dist 폴더에 생성됩니다.
  - node server.js 형태로 구동됩니다.
### 디렉토리 구조
  - /dist (빌드 시 생성) → 타입스크립트 컴파일러가 빌드한 결과물이 생성됩니다.
  - /src
    - @types → express의 미들웨어에 한해 사용됩니다.
    - /config → 환경 변수로부터 백앤드 앱이 사용하는 설정을 가져옵니다.
    - /controllers → MVC 패턴의 Controller이며 비즈니스 로직의 연결을 담당합니다.
      - 컨트롤러는 express의 미들웨어 함수로 정의합니다.
      - 컨트롤러를 담당하는 파일들은 [기능명].controller.ts로 명명됩니다.
    - /data (현재 삭제) → 앱 초기 실행 시 데이터베이스에 들어가 있어야 할 항목들을 정의합니다.
    - /models → MVC 패턴의 Model이자 sequelize의 RDB 객체를 정의합니다.
      - 내부 파일들은 [테이블명].ts 들과 index.ts가 있습니다.
      - [테이블명].ts들은 테이블을 객체로 정의합니다.
      - index.ts는 RDB의 기본 설정과 테이블 간 관계 설정 등을 정의합니다.
    - /modules → 여러 모듈들이 위치합니다.
      - 현재는 jwt strategy와 에러 핸들러가 정의되어 있습니다.
    - /routes → express의 라우팅을 정의합니다.
      - 라우팅은 URI 및 HTTP 메소드로 구성되는 특정 엔드포인트에 대한 요청에 응답하는 방법을 정의하는 것을 의미합니다.
      - 내부 파일들은 [라우트 상위 경로명].routes.ts 들과 index.ts가 있습니다.
      - [라우트 상위 경로명].routes.ts 파일들은 요청에 따른 컨트롤러를 연결합니다.
      - index.ts는 jwt 미들웨어 및 라우트를 express에 적용합니다.
    - /seeders → sequelize cli로 RDB에 시드 데이터를 삽입할 때 사용합니다.
      - 시드 데이터를 저장하고 있으며 테스트 시에만 사용됩니다.
      - express 구동과 직접적인 연관은 없습니다.
    - /service → 데이터 유효성, 트랜잭션 처리 등 RDB와 직접 상호작용하는 로직입니다.
      - 컨트롤러 모듈에서 서비스를 호출하는 식으로 사용됩니다.
    - /swagger → Swagger API 관련 yaml 파일, 설정 파일이 있습니다.
    - /tests → jest 테스트 파일들이 있습니다.
    - /mapping → 엔티티와 DTO 간 매핑을 해주는 함수들이 있습니다.
    - /types → 매핑 관련 타입들을 정의합니다.