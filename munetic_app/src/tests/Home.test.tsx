import { render } from '@testing-library/react';
import Home from '../components/Home';

describe('Home test', () => {
  it('has buttons', () => {
    const { getByText } = render(<Home />);
    getByText('레슨 찾기');
    getByText('레슨 등록');
  });
});
