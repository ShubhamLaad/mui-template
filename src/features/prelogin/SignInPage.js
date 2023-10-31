import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthenticateAPIMutation } from './preloginSliceAPI';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../slices/userSlice';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { FORGOTPASS, REGISTER } from '../../constants/ROUTES';
import { ButtonAPI } from '../../components/Button/ButtonAPI';

const theme = createTheme();
// r00t01@CIPHERLAB

export function SignInPage() {
  const [authenticateAPI, { error, isError, isLoading, isSuccess }] =
    useAuthenticateAPIMutation();
  const dispatch = useDispatch();
  const { sessionObj } = useSelector((state) => state.userSession);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqObj = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const resp = await authenticateAPI(reqObj);
    const sessionObj = resp.data?.data;
    if (sessionObj) {
      dispatch(userLogin(sessionObj));
    }
  };

  if (sessionObj.isVerified) {
    return null;
  }

  console.log(error);

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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="current-password"
            />

            {isError && <Alert severity="error">{error?.data?.message}</Alert>}

            <Box sx={{ m: 1, position: 'relative' }}>
              <ButtonAPI
                isLoading={isLoading}
                isSuccess={isSuccess}
                name="Sign in"
              />
              {/* <Button
                variant="contained"
                sx={buttonSx}
                disabled={isLoading}
                type="submit"
                fullWidth
              >
                Sign In
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
              )} */}
            </Box>

            <Grid container>
              <Grid item xs>
                <Link to={FORGOTPASS}>Forgot Password?</Link>
              </Grid>
              <Grid item>
                <Link to={REGISTER}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
