import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { usePostAPIMutation } from './resetPassSliceAPI';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../components/Toast/toastSlice';
import { useEffect } from 'react';
import { ButtonAPI } from '../../components/Button/ButtonAPI';
import { resetPassAPIErrorMsg } from '../../utils/utils';

const theme = createTheme();
export function ResetPassPage() {
  const { email = '', jwToken = '' } = useSelector(
    (state) => state.userSession.sessionObj
  );
  const [postAPI, { error, isError, isLoading, isSuccess }] =
    usePostAPIMutation();
  const disptach = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqObj = {
      email,
      token: jwToken,
      password: data.get('password'),
      confirmPassword: data.get('confirm-password'),
    };
    await postAPI(reqObj);
  };
  useEffect(() => {
    if (isSuccess) {
      disptach(setToastMsg(`Password has been reset Succesfully`));
    }
  }, [disptach, isSuccess]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            {isError && (
              <Alert severity="error">{resetPassAPIErrorMsg(error)}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              defaultValue={email}
              disabled
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="off"
            />

            <Box sx={{ m: 1, position: 'relative', mb: 10 }}>
              <ButtonAPI
                isLoading={isLoading}
                isSuccess={isSuccess}
                name="Submit"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
