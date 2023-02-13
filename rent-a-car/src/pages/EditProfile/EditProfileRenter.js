import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useAuthContext } from '../../hooks/useAuthContext';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FormButton from '../../components/form/FormButton';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import * as renterService from "../../services/renterService.js"
import { useNavigate } from "react-router-dom";
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

      useEffect(() => {
        renterService.getById(user.user.renterId)
            .then((renter) => {
                console.log(renter)
                setUser({...renter});
               
            }).catch(err => {
                console.log(err);
            });

        console.log(appUser)
    }, [user.user.renterId]);

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
                toast.success("You successfully updated your profile!", {autoClose: 1000})
                navigate('/my-profile');
            }) .catch(() => {
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
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={appUser.firstName}
                                fullWidth
                                autoComplete="First Name"
                                variant="standard"
                                s
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="latsName"
                                label="Last Name"
                                value={appUser.lastName}
                                fullWidth
                                autoComplete="Last Name"
                                variant="standard"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="drivingLicenceNumber"
                                name="drivingLicenceNumber"
                                label="Driving licence number"
                                value={appUser.drivingLicenceNumber}
                                fullWidth
                                autoComplete="Driving licence number"
                                variant="standard"
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Address"
                                name="address"
                                label="Address"
                                value={appUser.address}
                                fullWidth
                                autoComplete="Address"
                                variant="standard"
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