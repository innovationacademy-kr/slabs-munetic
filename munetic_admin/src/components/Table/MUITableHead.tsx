import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { userHeadCells, UserHeadCell } from './User/userHeadCells';
import { useLocation } from 'react-router-dom';
import {
  AdminUserHeadCell,
  adminUserHeadCells,
} from './AdminUser/adminUserHeadCells';
import { LessonHeadCell, lessonHeadCells } from './Lesson/LessonHeadCells';
import { useInfo } from '../../contexts/info';
import { CommentHeadCell, CommentHeadCells } from './Comment/CommentHeadCells';

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
  const info = useInfo() as any;

  let headCells:
    | readonly CommentHeadCell[]
    | readonly UserHeadCell[]
    | readonly AdminUserHeadCell[]
    | readonly LessonHeadCell[];
  headCells = [];

  if (path === '/comments') headCells = CommentHeadCells;
  if (path === '/users') headCells = userHeadCells;
  if (path === '/admin_users') headCells = adminUserHeadCells;
  if (path === '/lessons' || path === `/users/${info!.id}`)
    headCells = lessonHeadCells;

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
        {headCells.map(headCell => (
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
