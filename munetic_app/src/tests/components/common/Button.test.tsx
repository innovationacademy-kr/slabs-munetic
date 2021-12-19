import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Button from '../../../components/common/Button';

describe('Button test', () => {
  it('has link url', () => {
    const children = '레슨 찾기';
    const to = '/lesson/category';
    const { getByText } = render(
      <MemoryRouter>
        <Button to={to}>{children}</Button>
      </MemoryRouter>,
    );
    const link = getByText('레슨 찾기').closest('a');
    expect(link).toHaveAttribute('href', '/lesson/category');
  });
});
