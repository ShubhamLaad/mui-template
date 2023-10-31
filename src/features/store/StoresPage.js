import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  useAddAPIMutation,
  useRemoveAPIMutation,
  useGetAPIQuery,
  useUpdateAPIMutation,
} from './storeSliceAPI';
import { DeleteDialog } from '../../components/List/DeleteDialog';
import {
  CREATE,
  DEFAULT_ROW,
  INITIAL_PAGE,
  PAGE_SIZES,
  UPDATE,
} from '../../constants/APP';
import { MutationForm } from '../../components/List/MutationForm';
import { useColumns } from '../../components/List/useColumns';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../components/Toast/toastSlice';
import { getAPIErrorMsg } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { ListHead } from '../../components/List/ListHead';
import { BRANCHES, HOME } from '../../constants/ROUTES';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    sortable: false,
  },
  {
    field: 'code',
    headerName: 'Code',
    width: 150,
    sortable: false,
  },
];
const PAGE_NAME = 'Stores';

export function StoresPage() {
  const [pagination, setPagination] = useState({
    pageNumber: INITIAL_PAGE,
    pageSize: PAGE_SIZES[0],
  });
  const { data = {}, isFetching } = useGetAPIQuery(pagination);
  const { data: rows = [], records: availableRecordsNumber = 0 } = data;
  const [addAPI, addAPIResp] = useAddAPIMutation();
  const [removeAPI, removeAPIResp] = useRemoveAPIMutation();
  const [updateAPI, updateAPIResp] = useUpdateAPIMutation();
  const [openModalType, setOpenModalType] = useState(false);
  const [apiError, setAPIError] = useState('');
  const [deletingRowObj, setDeletingRowObj] = useState(null);
  const [updatingRowObj, setUpdatingRowObj] = useState(DEFAULT_ROW);
  const disptach = useDispatch();
  const handleDeleteRow = useCallback((params) => {
    setDeletingRowObj(params.row);
  }, []);

  const handleUpdateRow = useCallback((params) => {
    setOpenModalType(UPDATE);
    setUpdatingRowObj(params.row);
  }, []);

  const { columnsWithActions } = useColumns(
    columns,
    handleDeleteRow,
    handleUpdateRow
  );

  const navigate = useNavigate();

  const handleRowClick = ({ id }) => {
    navigate(`${id}${BRANCHES}`);
  };

  const handleAgreeDialog = useCallback(async () => {
    const resp = await removeAPI(deletingRowObj);
    if (resp.error) {
      setAPIError(getAPIErrorMsg(resp.error));
    } else {
      setDeletingRowObj(null);
      setAPIError('');
      disptach(setToastMsg(`Deleted successfully`));
    }
  }, [removeAPI, deletingRowObj, disptach]);

  const handleCloseDialog = useCallback(() => {
    setDeletingRowObj(null);
    setAPIError('');
  }, []);

  const handleMutationClose = useCallback(() => {
    setOpenModalType(false);
    setAPIError('');
    setUpdatingRowObj(DEFAULT_ROW);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const reqObj = {
        name: data.get('name'),
        code: data.get('code'),
      };
      let resp = null;
      if (openModalType === CREATE) {
        resp = await addAPI(reqObj);
      } else {
        resp = await updateAPI({ ...reqObj, id: updatingRowObj.id });
      }
      if (resp.error) {
        setAPIError(getAPIErrorMsg(resp.error));
      } else {
        handleMutationClose();
        disptach(setToastMsg(`${openModalType}d successfully`));
      }
    },
    [
      openModalType,
      addAPI,
      updateAPI,
      updatingRowObj.id,
      handleMutationClose,
      disptach,
    ]
  );

  const handleCreate = useCallback(() => {
    setOpenModalType(CREATE);
  }, []);

  return (
    <>
      <MutationForm
        openModalType={openModalType}
        handleSubmit={handleSubmit}
        handleClose={handleMutationClose}
        columns={columns}
        rowData={updatingRowObj}
        error={apiError}
        addAPIResp={addAPIResp}
        updateAPIResp={updateAPIResp}
      />
      <DeleteDialog
        deleteRow={deletingRowObj}
        handleCloseDialog={handleCloseDialog}
        handleAgreeDialog={handleAgreeDialog}
        error={apiError}
        removeAPIResp={removeAPIResp}
      />
      <ListHead
        pageName={PAGE_NAME}
        handleCreate={handleCreate}
        backLink={HOME}
      />
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columnsWithActions}
          loading={isFetching}
          onRowClick={handleRowClick}
          paginationMode="server"
          page={pagination.pageNumber - 1}
          pageSize={pagination.pageSize}
          rowsPerPageOptions={PAGE_SIZES}
          rowCount={availableRecordsNumber}
          onPageChange={(newPageNumber) => {
            setPagination({ ...pagination, pageNumber: newPageNumber + 1 });
          }}
          onPageSizeChange={(pageSize) => {
            setPagination({ ...pagination, pageSize });
          }}
          disableColumnMenu={true}
          disableColumnSelector={true}
        />
      </Box>
    </>
  );
}
