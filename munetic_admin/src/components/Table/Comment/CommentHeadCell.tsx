import { TableCell, Rating } from '@mui/material';

export default function CommentTableCell({ row }: any) {
  return (
    <>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }} padding="none">
        {row.content}
      </TableCell>
      <TableCell sx={{ fontSize: '1.25rem' }}>
        <Rating value={row.stars} readOnly />
      </TableCell>
      <TableCell align="left" sx={{ fontSize: '1.25rem' }}>
        {row['Lesson.title']}
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
