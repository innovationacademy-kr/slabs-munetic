import { AddAdminUser } from '../components/InputsContainers/AddAdminUser';
import MUITable from '../components/Table/MUITable';
import { useEffect, useState } from 'react';
import * as Api from '../lib/api';

export default function AdminUserPage() {
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

  /**
   * 데이터에 변동이 생겼을 시 다시 렌더링하는 이벤트
   */
  const handleReRender = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    Api.getAdminUserList(page).then(({ data }: any) => {
      setRows(data.data.rows);
      setCount(parseInt(data.data.count, 10));
    });
  }, [page, count]);

  return (
    <>
      <AddAdminUser rerender={handleReRender} />
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
