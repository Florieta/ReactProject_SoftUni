import * as React from 'react';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '../../components/Typography/Typography';
import AppForm from '../../components/AppForm/AppForm';
import FormButton from '../../components/Common/FormButton';
import withRoot from './../../withRoot';
import { AuthContext } from "../../context/AuthContext";
import * as authService from "../../services/authService";

function SignIn() {
  const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      userName,
      password,
  } = Object.fromEntries(new FormData(event.target));

  authService.login(userName, password)
            .then(authData => {
                userLogin(authData);
                toast.success("You were successfully logged in!", {autoClose: 1000})
                navigate('/');
            })
            .catch(() => {
                 navigate('/error');
            });
  };

  return (
    <React.Fragment>
    <AppForm>
      <React.Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign In
        </Typography>
        <Typography variant="body2" align="center">
          {'Not a member yet? '}
          <Link
            href="/register-renter"
            align="center"
            underline="always"
          >
            Sign Up here
          </Link>
        </Typography>
      </React.Fragment>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="Username"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              size="large"
              color="secondary"
              fullWidth
            >
              Sign In
            </FormButton>
          </Box>
      <Typography align="center">
        <Link underline="always" href="/forgot-password">
          Forgot password?
        </Link>
      </Typography>
    </AppForm>
  </React.Fragment>
  );
}

export default withRoot(SignIn);