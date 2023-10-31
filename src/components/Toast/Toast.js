import { Alert, Snackbar } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToastMsg } from './toastSlice';

export function Toast() {
  const { toastMsg } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const handleToastClose = useCallback(() => {
    dispatch(setToastMsg(''));
  }, [dispatch]);

  return (
    <Snackbar
      open={Boolean(toastMsg)}
      autoHideDuration={2000}
      onClose={handleToastClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert onClose={handleToastClose} severity="success">
        {toastMsg}
      </Alert>
    </Snackbar>
  );
}
