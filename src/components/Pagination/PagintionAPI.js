import { TablePagination } from '@mui/material';
import { PAGE_SIZES } from '../../constants/APP';

export function PaginationAPI({
  availableRecordsNumber,
  pagination,
  setPagination,
}) {
  return (
    <table>
      <tbody>
        <tr>
          <TablePagination
            color="primary"
            count={availableRecordsNumber}
            page={pagination.pageNumber - 1}
            rowsPerPage={pagination.pageSize}
            rowsPerPageOptions={PAGE_SIZES}
            onPageChange={(event, newPageNumber) => {
              setPagination({ ...pagination, pageNumber: newPageNumber + 1 });
            }}
            onRowsPerPageChange={(event) => {
              setPagination({
                pageNumber: 1,
                pageSize: event.target.value,
              });
            }}
            showFirstButton
            showLastButton
          />
        </tr>
      </tbody>
    </table>
  );
}
