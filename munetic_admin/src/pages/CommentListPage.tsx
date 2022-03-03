import { useState, useEffect } from 'react';
import MUITable from '../components/Table/MUITable';
import * as Api from '../lib/api';

function delComments(arr: ReadonlyArray<number>) {
  Api.deleteComments(arr, false)
  .then(res => console.log(`${res.data.data}개의 댓글 삭제`))
  .catch(e => console.log(`err : ${e}`));
}

export default function CommentListPage() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<[]>([]);
  const [count, setCount] = useState(0);

  /**
   * Page 전환
   */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  /**
   * 한 페이지에 노출하는 row수
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getComments = () => {
    const limit = 10;
    const offset = page * limit;
    Api.getAllComments(offset, limit).then(({ data }: any) => {
      setRows(data.data.rows);
      setCount(parseInt(data.data.count, 10));
    });
  }

  useEffect(() => {
    getComments();
  }, [page]);

  return (
    <MUITable
      page={page}
      count={count}
      rows={rows}
      rowsPerPage={rowsPerPage}
      onClickDeleteButton={(arr) => {
        delComments(arr);
        getComments();
      }}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
