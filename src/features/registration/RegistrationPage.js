import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { SIGNIN } from '../../constants/ROUTES';
import { usePostAPIMutation } from './registrationSliceAPI';
import { ButtonAPI } from '../../components/Button/ButtonAPI';
import { useEffect } from 'react';
import { setToastMsg } from '../../components/Toast/toastSlice';
import { useDispatch } from 'react-redux';
import { registrationPassAPIErrorMsg } from '../../utils/utils';

const theme = createTheme();
export function RegistrationPage() {
  const [postAPI, { error, isError, isLoading, isSuccess }] =
    usePostAPIMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqObj = {
      firstName: data.get('first-name'),
      lastName: data.get('last-name'),
      email: data.get('email'),
      userName: data.get('user-name'),
      password: data.get('password'),
      confirmPassword: data.get('confirm-password'),
    };
    postAPI(reqObj);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToastMsg(`Account Created successfully`));
    }
  }, [dispatch, isSuccess]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{ mt: 1, width: '100%' }}
          >
            {isError && (
              <Alert severity="error">
                {registrationPassAPIErrorMsg(error)}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="first-name"
              label="First Name"
              name="first-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last-name"
              label="Last Name"
              name="last-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="user-name"
              label="Username"
              name="user-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
            />

            <Box sx={{ m: 1, position: 'relative' }}>
              <ButtonAPI
                isLoading={isLoading}
                isSuccess={isSuccess}
                name="Submit"
              />
            </Box>
            <Grid container sx={{ mt: 3 }}>
              <Grid item xs>
                <Link to={SIGNIN}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
