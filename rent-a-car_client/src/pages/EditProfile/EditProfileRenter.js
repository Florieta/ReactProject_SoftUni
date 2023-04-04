import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as renterService from "../../services/renterService.js"
import FormButton from '../../components/Common/FormButton'
import withRoot from '../../withRoot';

const EditProfileRenter = () => {
    const { user } = useAuthContext();
    const values = {
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        age: "",
        drivingLicenceNumber: "",
        expiredDate: "",
    }
    const [appUser, setUser] = useState(values);
    const navigate = useNavigate();
    const [formErrors, setFormErros] = useState({
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        age: '',
        drivingLicenceNumber: '',
        address: ''
    });

    useEffect(() => {
        renterService.getById(user.user.renterId)
            .then((renter) => {
                setUser({ ...renter });
            }).catch(err => {
                console.log(err);
            });
    }, [user.user.renterId]);

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

        if (e.target.name === 'age' && (value < 18)) {
            errors.userName = 'Age should be more than 18!';
        }

        if (e.target.name === 'drivingLicenceNumber' && (value.length < 5 || value.length > 20)) {
            errors.userName = 'Driving licence number should be between 3 and 20 characters!';
        }

        if (e.target.name === 'address' && (value.length < 10 || value.length > 75)) {
            errors.userName = 'Address should be between 10 and 75 characters!';
        }

        if (e.target.name === 'email' && (value.length < 5 || value.length > 50)) {
            errors.userName = 'Email address should be between 5 and 50 characters!';
        }
        setFormErros(errors);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const renterId = user.user.renterId;
        const id = user.user.id;
        setUser({
            ...appUser,
            renterId,
            id,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        renterService.Update({ ...appUser }, user.user.id)
            .then(() => {
                toast.success("You successfully updated your profile!", { autoClose: 1000 })
                navigate('/my-profile');
            }).catch(() => {
                navigate('/error');
            });
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom align='center'>
                    Edit Your Profile
                </Typography>
                <form>
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.firstName
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.firstName}
                            </span>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={appUser.firstName}
                                fullWidth
                                autoComplete="First Name"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.lastName
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.lastName}
                            </span>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={appUser.lastName}
                                fullWidth
                                autoComplete="Last Name"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.email
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.email}
                            </span>
                            <TextField
                                required
                                id="Email"
                                name="email"
                                label="Email Address"
                                value={appUser.email}
                                fullWidth
                                autoComplete="Email Address"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.userName
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.userName}
                            </span>
                            <TextField
                                required
                                id="userName"
                                name="userName"
                                label="Username"
                                value={appUser.userName}
                                fullWidth
                                autoComplete="Username"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.phoneNumber
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.phoneNumber}
                            </span>
                            <TextField
                                required
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone number"
                                value={appUser.phoneNumber}
                                fullWidth
                                autoComplete="Phone number"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.age
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.age}
                            </span>
                            <TextField
                                required
                                id="age"
                                name="age"
                                label="Age"
                                value={appUser.age}
                                fullWidth
                                autoComplete="Age"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.drivingLicenceNumber
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.drivingLicenceNumber}
                            </span>
                            <TextField
                                required
                                id="drivingLicenceNumber"
                                name="drivingLicenceNumber"
                                label="Driving licence number"
                                value={appUser.drivingLicenceNumber}
                                fullWidth
                                autoComplete="Driving licence number"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.address
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.address}
                            </span>
                            <TextField
                                required
                                id="Address"
                                name="address"
                                label="Address"
                                value={appUser.address}
                                fullWidth
                                autoComplete="Address"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                    </Grid>
                    <Stack direction="row">
                        <FormButton
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                            color="secondary"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Submit
                        </FormButton>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default withRoot(EditProfileRenter);