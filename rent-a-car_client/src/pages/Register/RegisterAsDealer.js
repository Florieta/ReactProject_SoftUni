import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '../../components/Typography/Typography'
import FormButton from './../../components/Common/FormButton';
import AppForm from './../../components/AppForm/AppForm';
import { AuthContext } from '../../context/AuthContext';
import * as authService from '../../services/authService';
import withRoot from './../../withRoot';

function SignUpDealer() {
  const { userRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formErrors, setFormErros] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    companyName: '',
    companyNumber: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      userName,
      password,
      email,
      firstName,
      lastName,
      phoneNumber,
      companyName,
      companyNumber,
      address
    } = Object.fromEntries(new FormData(e.target));

    authService.registerDealer(userName, password, email, firstName, lastName, phoneNumber, address, companyName, companyNumber)
      .then(authData => {
        userRegister(authData);
        toast.success("You were successfully registered!", { autoClose: 1000, });
        navigate('/login');
      }).catch(() => {
        toast.error("Something went wrong!")
        navigate('/error');
      });
  }

  const formValidate = (e) => {
    const value = e.target.value;
    const errors = {};

    if (e.target.name === 'firstName' && (value.length < 2 || value.length > 20)) {
      errors.firstName = 'First name should be between 2 and 20 characters!';
    }

    if (e.target.name === 'lastName' && (value.length < 2 || value.length > 20)) {
      errors.lastName = 'Last name should be between 2 and 20 characters!';
    }

    if (e.target.name === 'userName' && (value.length < 2 || value.length > 20)) {
      errors.userName = 'Username should be between 2 and 20 characters!';
    }

    if (e.target.name === 'phoneNumber' && (value.length < 5 || value.length > 15)) {
      errors.userName = 'Phone number should be between 5 and 15 characters!';
    }

    if (e.target.name === 'companyNumber' && (value.length < 5 || value.length > 20)) {
      errors.userName = 'Company number should be between 5 and 20 characters!';
    }

    if (e.target.name === 'companyName' && (value.length < 3 || value.length > 20)) {
      errors.userName = 'Company name should be between 3 and 20 characters!';
    }

    if (e.target.name === 'address' && (value.length < 10 || value.length > 75)) {
      errors.userName = 'Address should be between 10 and 75 characters!';
    }

    if (e.target.name === 'email' && (value.length < 5 || value.length > 50)) {
      errors.userName = 'Email address should be between 5 and 50 characters!';
    }
    setFormErros(errors);
  };


  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/login" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>

              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onBlur={formValidate}
              />
              <span
                hidden={
                  formErrors?.firstName
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.firstName}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onBlur={formValidate}
              />
              <span
                hidden={
                  formErrors?.lastName
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.lastName}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="Username"
                onBlur={formValidate}
              />
              <span
                hidden={
                  formErrors?.userName
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.userName}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone number"
                name="phoneNumber"
                autoComplete="Phone number"
                onBlur={formValidate}
              />
              <span
                hidden={
                  formErrors?.phoneNumber
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.phoneNumber}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={formValidate}
              />
              <span
                hidden={
                  formErrors?.email
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.email}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="companyName"
                label="Company name"
                name="companyName"
                autoComplete="Company name"
                onBlur={formValidate}
              />
              <span
                hidden={
                  formErrors?.companyName
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.companyName}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span
                hidden={
                  formErrors?.companyNumber
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.companyNumber}
              </span>
              <TextField
                required
                fullWidth
                id="companyNumber"
                label="Company number"
                name="companyNumber"
                autoComplete="Company number"
                onBlur={formValidate}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="Address"
                onBlur={formValidate}
              />
              <span
                hidden={
                  formErrors?.address
                    ? false
                    : true
                }
                style={{ color: 'red', fontSize: '10px' }}>
                {formErrors.address}
              </span>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>

          <FormButton
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
            fullWidth
          >Sign Up
          </FormButton>
        </Box>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUpDealer);