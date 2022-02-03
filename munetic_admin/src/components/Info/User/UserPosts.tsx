import MUITable from '../../Table/MUITable';
import { useEffect, useState } from 'react';
import { useInfo } from '../../../contexts/info';
import * as Api from '../../../lib/api';

export default function UserPosts() {
  const info = useInfo() as any;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
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

  useEffect(() => {
    const limit = 5;
    const offset = page * limit;
    Api.getUserLessons(info!.id, offset, limit).then(({ data }: any) => {
      setRows(data.data.rows);
      setCount(parseInt(data.data.count, 10));
    });
  }, [page]);

  return (
    <>
      <MUITable
        page={page}
        count={count}
        rows={rows}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
