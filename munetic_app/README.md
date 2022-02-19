## 프론트앤드 (munetic_app)

### build & run
  - 빌드 도구는 vite를 사용하며 TypeSctipt + React 기반입니다.
  - tsc / vite build 명령으로 컴파일 합니다.
  - serve ./dist 를 이용해 정적 파일 서버 형태로 배포합니다.
### 디렉토리 구조
  - dist (빌드 시 생성) → vite가 빌드한 결과물이 생성됩니다.
  - /src
    - /components → React 컴포넌트들이 정의되어 있습니다.
    - /context → 전역적인 상태 관리를 위한 모듈입니다.
      - 보통 redux를 사용하지만 상태 관리 객체가 얼마 없어 리액트의 Context를 이용합니다.
    - /lib → API 접근을 위한 객체가 정의되어 있는 모듈입니다.
      - axios와 HTTP URI를 이용해 HTTP Request를 보내기 위한 객체들을 정의합니다.
    - /pages → 페이지 컴포넌트가 정의되어 있습니다.
      - react-router에 의해 라우팅되는 타겟의 컴포넌트들이 정의되어 있습니다.
    - /style → CSS 태그로 정의되는 스타일 컴포넌트들이 정의되어 있습니다.
      - 스타일 컴포넌트들은 styled-components를 이용해 정의합니다.
    - /tests → jest 테스트 파일들이 있습니다.
      - 단위 테스트, 통합 테스트가 있습니다.
    - /types → 타입들이 정의되어 있습니다.
    - App.tsx → 리액트의 메인 앱(페이지)입니다.
    - main.tsx → 메인 페이지 입니다.
    - Routing.tsx → react-router를 이용해 라우팅 경로들을 정의합니다.