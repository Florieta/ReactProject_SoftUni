import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '../../components/Typography/Typography'
import withRoot from './../../withRoot';
import FormButton from './../../components/form/FormButton';
import AppForm from './../../components/AppForm/AppForm';


function SignUpRenter() {
   /* const { userRegister } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            userName,
            password,
            email,
            firstName,
            lastName,
            phoneNumber,
            age,
            drivingLicenceNumber,
            expiredDate,
            address
        } = Object.fromEntries(new FormData(e.target));

        authService.register(userName, password, email, firstName, lastName, phoneNumber, address, age, drivingLicenceNumber, expiredDate)
            .then(authData => {
                userRegister(authData);
                toast.success("You were successfully registered!", {autoClose: 1000});
                navigate('/login');
            }).catch(() => {
              navigate('/error');
         });
    };*/

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
          <Box component="form" noValidate /*onSubmit={handleSubmit}*/ sx={{ mt: 3 }}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  autoComplete="Username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone number"
                  name="phoneNumber"
                  autoComplete="Phone number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="Age"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="drivingLicenceNumber"
                  label="Driving Licence Number"
                  name="drivingLicenceNumber"
                  autoComplete="Driving Licence Number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                InputLabelProps={{shrink: true}}
                  required
                  fullWidth
                  type="date"
                  id="expiredDate"
                  label="Expired Date"
                  name="expiredDate"
                  autoComplete="Expired Date"
                />
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

export default withRoot(SignUpRenter);