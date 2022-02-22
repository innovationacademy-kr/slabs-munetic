import { useState, useEffect } from 'react';
import MUITable from '../components/Table/MUITable';
import * as Api from '../lib/api';

function delLessons(arr: ReadonlyArray<number>) {
  Api.deleteLessons(arr, false)
  .then(res => console.log(`${res.data.data}개의 레슨 삭제`))
  .catch(e => console.log(`err : ${e}`));
}

export default function LessonListPage() {
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

  const getLessons = () => {
    const limit = 10;
    const offset = page * limit;
    Api.getAllLessons(offset, limit).then(({ data }: any) => {
      setRows(data.data.rows);
      setCount(parseInt(data.data.count, 10));
    });
  }

  useEffect(() => {
    getLessons();
  }, [page]);

  return (
    <MUITable
      page={page}
      count={count}
      rows={rows}
      rowsPerPage={rowsPerPage}
      onClickDeleteButton={(arr) => {
        delLessons(arr);
        getLessons();
      }}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
