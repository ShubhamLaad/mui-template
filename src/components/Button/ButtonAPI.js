import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

export function ButtonAPI({ isSuccess, isLoading, name, ...props }) {
  const buttonSx = {
    ...(isSuccess && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={isLoading}
        type="submit"
        fullWidth
        {...props}
      >
        {name}
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </div>
  );
}
