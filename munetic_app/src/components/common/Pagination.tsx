import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import palette from '../../style/palette';

const PaginationContainer = styled.div`
  .container {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .container li + li {
    margin-left: 3px;
  }

  .container li {
    line-height: normal;
  }

  .container a {
    padding: 5px 10px;
    display: flex;
    line-height: 1;
  }

  .currentPage {
    background-color: ${palette.lightBlue};
  }
  .disabledLink {
    color: #bfbfbf;
  }
`;

interface IProps {
  itemsPerPage: number;
  classCount: number;
  handlePageClick: (e: any) => void;
}

const Pagination = ({ itemsPerPage, classCount, handlePageClick }: IProps) => {
  const pageCount = Math.ceil(classCount / itemsPerPage);

  return (
    <PaginationContainer>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount ? pageCount : 0}
        nextLabel="다음 >"
        previousLabel="< 이전"
        containerClassName="container"
        activeClassName="currentPage"
        disabledLinkClassName="disabledLink"
      />
    </PaginationContainer>
  );
};

export default Pagination;
