# slabs-munetic

## 소개
42와 기업이 협력하여 결과물을 만드는 프로젝트입니다.

Munetic이라는 음악 레슨 매칭앱의 MVP(Minimum Viable Product)를 구현하는 것을 목적으로 하며 3 명이 한 팀이 되어 약 1달간의 개발 기간을 가지며 총 3개의 개발 팀이 릴레이 방식으로 개발하는 프로젝트입니다.

## Installation & Execution
Munetic 앱의 프로젝트는 docker-compose로 구성되어 있습니다. 이 프로젝트는 github actions를 통한 배포를 상정하여 구현이 되어 있습니다.

프로젝트를 실행시키는 방법은 다음과 같습니다.
1. .env_template 파일을 통해 .env를 설정해줍니다. `SERVER_HOST=localhost`가 아닌 경우 자동으로 https가 설정됩니다.
2. munetic_admin, munetic_app, munetic_express 내에서 `npm i`를 실행하여 package-lock.json파일을 생성합니다.
3. `docker-compose -f docker-compose.yaml -f network-main.yaml up` 를 통해 실행시킵니다.

## Browser Support
이 프로젝트는 모바일 전용 앱 (관리자 페이지는 PC 전용 앱) 으로 구현되었으며 크롬과 사파리 브라우저에서 테스트되었습니다.

## 폴더 상세 설명
### munetic_admin [상세 설명 링크](./munetic_admin/README.md)
React 기반으로 구현된 Munetic 앱의 관리자가 이용하는 어드민 페이지의 PC 뷰입니다.
### munetic_app [상세 설명 링크](./munetic_app/README.md)
React 기반으로 구현된 Munetic 앱의 사용자가 이용하는 일반 앱의 모바일 뷰입니다.
### munetic_express [상세 설명 링크](./munetic_express/README.md)
express.js 기반으로 구현된 프론트앤드 앱에 정보를 제공하고 전달받는 munetic의 백앤드입니다.
### munetic_database [상세 설명 링크](./munetic_database/README.md)
MariaDB 기반의 munetic의 사용자, 레슨, 카테고리 등의 정보를 저장하는 database입니다.
### munetic_proxy [상세 설명 링크](./munetic_proxy/README.md)
nginx를 이용해 munetic 프로젝트를 한 포트에서 접근할 수 있게 리버스 프록시를 제공하는 웹서버입니다.

## 관련 문서
* 시나리오 : https://github.com/innovationacademy-kr/slabs-munetic/blob/develop/docs/scenario.md
* figma 와이어프레임 : https://www.figma.com/file/6THnbJkS1vHRshCWU7422o/뮤네틱-화면-설명서?node-id=0%3A1

## Wiki
* https://github.com/innovationacademy-kr/slabs-munetic/wiki

## Service Domain
* https://munetic.dev.42cadet.kr
* https://munetic.42cadet.kr