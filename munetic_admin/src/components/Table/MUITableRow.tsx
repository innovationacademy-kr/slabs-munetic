import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { useLocation } from 'react-router-dom';
import UserTableCell from './User/UserTableCell';
import AdminUserTableCell from './AdminUser/AdminUserTableCell';

export interface MUITableRowProps {
  numSelected: number;
  rowCount: number;
  isItemSelected: boolean;
  labelId: string;
  row: any;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}

export default function MUITableRow({
  numSelected,
  rowCount,
  isItemSelected,
  labelId,
  row,
  handleClick,
}: MUITableRowProps) {
  const path = useLocation().pathname;
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
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event: any) => handleClick(event, row.id)}
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        align="left"
        scope="row"
        padding="none"
      >
        {row.id}
      </TableCell>
      {path === '/users' && <UserTableCell row={row} />}
      {path === '/admin_users' && <AdminUserTableCell row={row} />}
    </TableRow>
  );
}
