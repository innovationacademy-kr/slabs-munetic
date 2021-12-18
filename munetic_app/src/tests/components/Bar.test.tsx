import { render } from '@testing-library/react';
import Bar from '../../components/Bar';

describe('test example: 전체 test이름이 들어감', () => {
  //describe는 여러 테스트를 묶어줌
  it('has 등록 버튼: test 이름', () => {
    const { getByText } = render(<Bar />);
    //render함수는 렌더링할 리액트 컴포넌트를 인자로 받아
    //React Testing Library가 제공하는 모든 쿼리 함수와
    //기타 유틸리티 함수를 담고 있는 객체를 리턴한다.
    getByText('등록');
    //'등록'이라는 텍스트를 가진 element가 있는지 확인하고 없으면 fail
  });

  //위 테스트랑 같은 테스트 다른 예시
  it('has 등록 버튼: test 이름', () => {
    const { getByText } = render(<Bar />);
    const button = getByText('등록');
    expect(button).toHaveTextContent('등록');
    //button이 toHaveTextContent('등록')을 가지고있는지 expect하고 맞으면 성공
  });
});
