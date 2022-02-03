# slabs-munetic
42-기업 협력 프로젝트.
Munetic, 음악레슨 매칭앱의 MVP(Minimum Viable Product)를 3 명 씩으로 구성 된 총 3 개의 개발 팀이 릴레이 방식으로 개발하는 프로젝트입니다.

## Installation & Execution
이 repository는 github actions를 통한 배포에 최적화되어있습니다. 이외의 서버에서 실행시키는 방법은 다음과 같습니다.
1. .env_template 파일을 통해 .env를 설정해줍니다. `SERVER_HOST=localhost`가 아닌 경우 자동으로 https가 설정됩니다.
2. munetic_admin, munetic_app, munetic_express 내에서 `npm i`를 실행하여 package-lock.json파일을 생성합니다.
3. `docker-compose -f docker-compose.yaml -f network-main.yaml up`를 통해 실행시킵니다.

## Browser Support
이 프로젝트는 크롬과 사파리 환경에서. 테스트되었습니다.

## 폴더 상세 설명
### munetic_admin
Munetic 앱의 관리자가 이용하는 어드민 페이지의 PC 뷰입니다.  
React로 만들어져 있습니다.
### munetic_app
Munetic 앱의 사용자가 이용하는 일반 앱의 모바일 뷰입니다.  
React로 만들어져 있습니다.
### munetic_express
munetic_admin, munetic_app에 정보를 제공하고 전달받는 munetic의 backend입니다.  
express.js로 만들어져 있습니다.
### munetic_database
munetic의 사용자, 레슨, 카테고리 등의 정보를 제공하는 database입니다.  
MariaDB를 사용합니다.
### munetic_proxy
munetic 프로젝트를 한 포트에서 접근할 수 있게 리버스 프록시를 제공하는 웹서버입니다.  
nginx로 만들어져있습니다.
