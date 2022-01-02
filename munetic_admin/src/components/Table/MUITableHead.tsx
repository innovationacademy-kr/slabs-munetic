import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { userHeadCells, UserData, UserHeadCell } from './userHeadCells';
import { useLocation } from 'react-router-dom';

export interface MUITableProps {
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MUITableHead({
  numSelected,
  rowCount,
  onSelectAllClick,
}: MUITableProps) {
  const path = useLocation().pathname;

  let headCells: readonly UserHeadCell[];
  if (path === '/users') headCells = userHeadCells;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {userHeadCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ fontSize: '1.25rem', fontWeight: 700 }}
          >
            {headCell.label}
            <TableSortLabel direction="asc" /> {/* "asc" , "desc" */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
