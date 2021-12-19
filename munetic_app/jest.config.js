module.exports = {
  preset: 'vite-jest',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  //셋업 파일 위치
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ], //src폴더 내부에 test나 spec 이름을 포함한 파일을 test 대상으로 한다.
  testEnvironment: 'jest-environment-jsdom',
  //test가 진행되는 환경
};
