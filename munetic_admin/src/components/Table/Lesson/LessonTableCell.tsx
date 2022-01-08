import { TableCell } from '@mui/material';

export default function LessonTableCell({ row }: any) {
  return (
    <>
      <TableCell sx={{ fontSize: '1.25rem' }}>{row['User.login_id']}</TableCell>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }}>
        {row['Category.name']}
      </TableCell>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }}>
        {row.title}
      </TableCell>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }}>
        {row.createdAt}
      </TableCell>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }}>
        {row.deletedAt}
      </TableCell>
    </>
  );
}
