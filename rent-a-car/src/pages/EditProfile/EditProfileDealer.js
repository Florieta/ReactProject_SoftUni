import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import * as dealerService from "../../services/dealerService.js"
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FormButton from '../../components/form/FormButton.js';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import withRoot from '../../withRoot.js';

const EditProfileDealer = () => {
    const { user } = useAuthContext();

    const values = {
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        companyName: "",
        companyNumber: "",
    }
    const [appUser, setUser] = useState(values);
    const navigate = useNavigate();

    useEffect(() => {
        dealerService.getById(user.user.dealerId)
            .then((dealer) => {
                setUser({ ...dealer });
            }).catch(err => {
                console.log(err);
            });

    }, [user.user.dealerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const dealerId = user.user.dealerId;
        const id = user.user.id;
        setUser({
            ...appUser,
            dealerId,
            id,
            [name]: value,
        });


    };

    const handleSubmit = () => {

        dealerService.Update({ ...appUser }, user.user.id)
            .then(() => {
                toast.success("You successfully updated your profile!", { autoClose: 1000 })
                navigate('/my-profile');
            }).catch(() => {
                navigate('/error');
            });
    };

    return (

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 14 }, p: { xs: 2, md: 3 } }}>

                <Typography variant="h6" gutterBottom align='center'>
                    Edit Your Profile
                </Typography>
                <Grid container spacing={3}>
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
                            onChange={handleInputChange}
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
                            value={appUser.address}
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
                            id="companyName"
                            name="companyName"
                            label="Company name"
                            value={appUser.companyName}
                            fullWidth
                            autoComplete="Company name"
                            variant="standard"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="companyNumber"
                            name="companyNumber"
                            label="Company number"
                            value={appUser.companyNumber}
                            fullWidth
                            autoComplete="Company number"
                            variant="standard"
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
            </Paper>
        </Container>

    )
}

export default withRoot(EditProfileDealer);