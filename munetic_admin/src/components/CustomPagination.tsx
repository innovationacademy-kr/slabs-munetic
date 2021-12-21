import styled from '@emotion/styled';
import { Pagination } from '@mui/material';

export default function CustomPagination() {
  return (
    <PaginationMargin>
      <Pagination count={5} size="large" />
    </PaginationMargin>
  );
}

const PaginationMargin = styled.div`
  margin-left: 30rem;
  margin-top: 2rem;
`;
