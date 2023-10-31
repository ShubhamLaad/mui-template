import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { usePostAPIMutation } from './forgotPassSliceAPI';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { REGISTER, SIGNIN } from '../../constants/ROUTES';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../components/Toast/toastSlice';
import { ButtonAPI } from '../../components/Button/ButtonAPI';
import { useEffect } from 'react';
import { forgotPassAPIErrorMsg } from '../../utils/utils';

const theme = createTheme();
export function ForgotPassPage() {
  const [postAPI, { error, isError, isLoading, isSuccess }] =
    usePostAPIMutation();
  const disptach = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqObj = {
      email: data.get('email'),
    };
    postAPI(reqObj);
  };

  useEffect(() => {
    if (isSuccess) {
      disptach(setToastMsg(`Email Sent successfully`));
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              required
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            {isError && (
              <Alert severity="error">{forgotPassAPIErrorMsg(error)}</Alert>
            )}
            <Box sx={{ m: 1, position: 'relative' }}>
              <ButtonAPI
                isLoading={isLoading}
                isSuccess={isSuccess}
                name="Submit"
              />
            </Box>
            <Grid container sx={{ mt: 3 }}>
              <Grid item xs>
                <Link to={SIGNIN}>Sign in</Link>
              </Grid>
              <Grid item>
                <Link to={REGISTER}>Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
