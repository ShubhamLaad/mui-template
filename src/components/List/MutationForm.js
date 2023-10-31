import {
  Alert,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import { ButtonAPI } from '../Button/ButtonAPI';
import { CustomSelect } from '../Input/CustomSelect';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

function InputField({
  column: { field, headerName, mutationType = '', hideInMutation, options },
  rowData,
}) {
  if (hideInMutation) {
    return null;
  }
  let defaultValue = rowData[field];

  if (mutationType === 'date') {
    defaultValue = moment(defaultValue).format('YYYY-MM-DD');
  } else if (!defaultValue && mutationType === 'time') {
    defaultValue = moment(defaultValue).format('hh:mm');
  }

  const renderInput = () => {
    switch (mutationType) {
      case 'select':
        return (
          <CustomSelect
            options={options}
            label={headerName}
            name={field}
            defaultValue={defaultValue}
          />
        );
      default:
        return (
          <TextField
            required
            name={field}
            label={headerName}
            type={mutationType}
            fullWidth
            variant="standard"
            defaultValue={defaultValue}
          />
        );
    }
  };

  return (
    <Grid item xs={12}>
      {renderInput()}
    </Grid>
  );
}

export function MutationForm({
  openModalType,
  handleSubmit,
  handleClose,
  rowData,
  columns,
  error,
  addAPIResp,
  updateAPIResp,
  children,
}) {
  const [isLoading] = [addAPIResp.isLoading || updateAPIResp.isLoading];

  return (
    <Modal
      open={Boolean(openModalType)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          marginBottom={2}
        >
          {openModalType}
        </Typography>
        <Grid container spacing={3} marginBottom={3}>
          {children}
          {columns.map((column) => (
            <InputField column={column} key={column.field} rowData={rowData} />
          ))}
        </Grid>
        {error && <Alert severity="error">{error}</Alert>}
        <Box display="flex" justifyContent="flex-end" marginTop={5}>
          <Button onClick={handleClose}>Close</Button>
          <ButtonAPI name="Submit" isLoading={isLoading} />
        </Box>
      </Box>
    </Modal>
  );
}
