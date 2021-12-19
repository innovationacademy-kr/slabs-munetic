import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

describe('Home test', () => {
  it('has buttons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    getByText('레슨 찾기');
    getByText('레슨 등록');
  });
});
