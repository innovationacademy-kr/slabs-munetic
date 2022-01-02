import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MUITableHead from './MUITableHead';
import MUITableToolbar from './MUITableToolbar';
import MUITableRow from './MUITableRow';

export type TableProps = {
  page: number;
  rows: [];
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function MUITable({
  page,
  rows,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableProps) {
  const [selected, setSelected] = useState<readonly number[]>([]);

  /**
   * checkBox 전체 선택 이벤트
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  /**
   * checkBox row 선택 이벤트
   */
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rowsPerPage - rows.length;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <MUITableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <MUITableHead
              numSelected={selected.length}
              rowCount={rows.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {rows.map((row: any, index: any) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <MUITableRow
                    numSelected={selected.length}
                    rowCount={rows.length}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    row={row}
                    handleClick={handleClick}
                  ></MUITableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 50.9 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            '&  div': {
              fontSize: '1.25rem',
            },
            '&  p': {
              fontSize: '1.25rem',
            },
          }}
          rowsPerPageOptions={[10]}
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          nextIconButtonProps={{ disabled: emptyRows > 0 ? true : false }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
