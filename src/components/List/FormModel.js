import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

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
export function FormModel({
  openModalType,
  handleSubmit,
  handleClose,
  children,
}) {
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
        {children}
        <Box display="flex" justifyContent="flex-end" marginTop={5}>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
