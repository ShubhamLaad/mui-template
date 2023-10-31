import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ButtonAPI } from '../Button/ButtonAPI';

export function DeleteDialog({
  deleteRow,
  handleCloseDialog,
  handleAgreeDialog,
  error,
  removeAPIResp,
}) {
  const isLoading = removeAPIResp.isLoading;
  return (
    <Dialog
      open={Boolean(deleteRow)}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure! you want to delete?
        </DialogContentText>
      </DialogContent>
      {error && <Alert severity="error">{error}</Alert>}

      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <ButtonAPI
          name="Yes"
          onClick={handleAgreeDialog}
          isLoading={isLoading}
        />
      </DialogActions>
    </Dialog>
  );
}
