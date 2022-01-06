import { TableCell } from '@mui/material';

export default function AdminUserTableCell({ row }: any) {
  return (
    <>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }} padding="none">
        {row.login_id}
      </TableCell>
      <TableCell sx={{ fontSize: '1.25rem' }}>{row.name}</TableCell>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }}>
        {row.type}
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
