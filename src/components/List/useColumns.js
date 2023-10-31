import { GridActionsCellItem } from '@mui/x-data-grid';
import { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';

export function useColumns(
  columns,
  handleDeleteRow,
  handleUpdateRow,
  handleStatusClick
) {
  const columnsWithActions = useMemo(
    () => [
      ...columns,
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        headerName: 'Actions',
        hideInMutation: true,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              handleDeleteRow(params);
            }}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleUpdateRow(params);
            }}
            showInMenu
          />,
          <GridActionsCellItem
            icon={
              params.row.shift_status === 'Not Started' ? (
                <PlayArrowIcon />
              ) : (
                <DoneIcon />
              )
            }
            label={
              params.row.shift_status === 'Not Started'
                ? 'Start Shift'
                : 'Finish Shift'
            }
            onClick={() => {
              handleStatusClick(
                params,
                params.row.shift_status === 'Not Started' ? 'Started' : 'Done'
              );
            }}
            style={{
              display:
                !handleStatusClick || params.row.shift_status === 'Done'
                  ? 'none'
                  : '',
            }}
            showInMenu
          />,
        ],
      },
    ],
    [columns, handleDeleteRow, handleStatusClick, handleUpdateRow]
  );

  return { columnsWithActions };
}
