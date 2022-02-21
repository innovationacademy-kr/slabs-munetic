import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { useLocation } from 'react-router-dom';
import UserTableCell from './User/UserTableCell';
import AdminUserTableCell from './AdminUser/AdminUserTableCell';
import LessonTableCell from './Lesson/LessonTableCell';
import { useInfo } from '../../contexts/info';
import { useNavigate } from 'react-router-dom';
import CommentTableCell from './Comment/CommentHeadCell';

export interface MUITableRowProps {
  numSelected: number;
  rowCount: number;
  isItemSelected: boolean;
  row: any;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}

export default function MUITableRow({
  isItemSelected,
  row,
  handleClick,
}: MUITableRowProps) {
  const path = useLocation().pathname;
  const info = useInfo() as any;
  const navigate = useNavigate();

  const moveInfoPage = () => {
    if (path === '/users') navigate(`/users/${row.id}`);
    if (path === '/admin_users') navigate(`/admin_users/${row.id}`);
    if (path.slice(0, 7) === `/users/`) navigate(`/lessons/${row.id}`);
    if (path === '/lessons') navigate(`/lessons/${row.id}`);
  };
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      sx={{
        '& th': {
          fontSize: '1.25rem',
        },
      }}
      onClick={moveInfoPage}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event: any) => handleClick(event, row.id)}
          color="primary"
          checked={isItemSelected}
        />
      </TableCell>
      <TableCell component="th" align="left" scope="row" padding="none">
        {row.id}
      </TableCell>
      {path === '/users' && <UserTableCell row={row} />}
      {path === '/comments' && <CommentTableCell row={row} />}
      {path === '/admin_users' && <AdminUserTableCell row={row} />}
      {(path === '/lessons' || path === `/users/${info!.id}`) && (
        <LessonTableCell row={row} />
      )}
    </TableRow>
  );
}
