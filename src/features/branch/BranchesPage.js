import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  useAddAPIMutation,
  useRemoveAPIMutation,
  useGetAPIQuery,
  useUpdateAPIMutation,
} from './brancheSliceAPI';
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
import { useParams } from 'react-router-dom';
import { ListHead } from '../../components/List/ListHead';
import { STORES } from '../../constants/ROUTES';

const PAGE_NAME = 'Branches';
const columns = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: false,
  },
  {
    field: 'code',
    headerName: 'Code',
    sortable: false,
    width: '120',
  },
  {
    field: 'area',
    headerName: 'Area',
    sortable: false,
  },
];

export function BranchesPage() {
  const { storeId } = useParams();

  const [pagination, setPagination] = useState({
    pageNumber: INITIAL_PAGE,
    pageSize: PAGE_SIZES[0],
  });
  const { data = {}, isFetching } = useGetAPIQuery({ ...pagination, storeId });
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

  const handleRowClick = (params) => {
    console.log(params);
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
        store_id: parseInt(storeId),
        code: data.get('code'),
        name: data.get('name'),
        area: data.get('area'),
      };
      let resp = null;
      if (openModalType === CREATE) {
        resp = await addAPI(reqObj);
      } else {
        resp = await updateAPI({ ...reqObj, branch_id: updatingRowObj.id });
      }
      if (resp.error) {
        setAPIError(getAPIErrorMsg(resp.error));
      } else {
        handleMutationClose();
        disptach(setToastMsg(`${openModalType}d successfully`));
      }
    },
    [
      storeId,
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
        backLink={STORES}
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
