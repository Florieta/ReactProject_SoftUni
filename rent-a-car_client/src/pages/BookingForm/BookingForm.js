import * as React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material'
import * as bookingService from "../../services/bookingService"
import { useAuthContext } from '../../hooks/useAuthContext';
import FormButton from '../../components/Common/FormButton';
import withRoot from '../../withRoot';

const initialValues = {
    pickUpDateAndTime: "",
    dropOffDateAndTime: "",
    duration: "",
    totalAmount: "",
    paymentType: "",
    pickUpLocationId: "",
    dropOffLocationId: "",
    carId: "",
    renterId: "",
};

const CreateBooking = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const [totalAmount, setFieldValue] = useState(0);
    const { user } = useAuthContext();
    const { carId } = useParams();
    const navigate = useNavigate();
    const [formErrors, setFormErros] = useState({
        duration: '',
    });

    const payment = [
        {
            value: 'card',
            label: 'Card',
        },
        {
            value: 'cash',
            label: 'Cash',
        },
        {
            value: 'bankTransfer',
            label: 'Bank Transfer',
        }
    ];
    const getCarById = () => {
        return fetch(`https://localhost:7016/api/Car/${carId}`)
            .then(res => res.json())
    }

    const {
        data: car,
    } = useQuery(['getCarKey'], getCarById, {
        retry: false,
        onError: () => toast.error('Something went wrong!'),
        refetchOnWindowFocus: false,
    })

    const getLocations = () => {
        return fetch('https://localhost:7016/api/Location')
            .then(res => res.json())
            .catch(() => {
                toast.error("Something went wrong!")
                navigate('/error');
            });
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['locationss'],
        queryFn: getLocations,
    })

    if (isLoading) {
        return <span><CircularProgress /></span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    formValues.renterId = user.user.renterId;

    const handleDurationChange = (e) => {
        e.preventDefault();
        formValues.duration = e.target.value;

        formValues.totalAmount = formValues.duration * (car.dailyRate ? car.dailyRate : 0);
        setFieldValue(formValues.totalAmount);
    }

    const formValidate = (e) => {
        const value = e.target.value;
        const errors = {};
        if (e.target.name === 'duration' && (value < 1)) {
            errors.duration = 'Duration should be bigger than 0!';
        }

        setFormErros(errors);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            carId,
            [name]: value,
        });

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        bookingService.Create({ ...formValues })
            .then(() => {
                toast.success("You successfully booked a car!", { autoClose: 1000 })
                navigate(`/my-bookings`);
            })
            .catch(() => {
                toast.error("Something went wrong!", { autoClose: 1000 })
                navigate('/error');
            });
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom align='center'>
                        Book a car
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                id="pickUpDateAndTime"
                                name="pickUpDateAndTime"
                                label="Pick up date and time"
                                type="datetime-local"
                                value={formValues.pickUpDateAndTime}
                                fullWidth
                                autoComplete="Pick up date and time"
                                variant="standard"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                id="dropOffDateAndTime"
                                name="dropOffDateAndTime"
                                label="Drop off date and time"
                                type="datetime-local"
                                value={formValues.dropOffDateAndTime}
                                fullWidth
                                autoComplete="Drop off date and time"
                                variant="standard"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    formErrors?.duration
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', fontSize: '10px' }}>
                                {formErrors.duration}
                            </span>
                            <TextField
                                required
                                id="duration"
                                name="duration"
                                label="Duration"
                                value={formValues.duration}
                                fullWidth
                                autoComplete="Duration"
                                variant="standard"
                                onChange={handleDurationChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="totalAmount"
                                name="totalAmount"
                                label="Total Amount(€)"
                                value={totalAmount}
                                fullWidth
                                autoComplete="Total Amount"
                                variant="standard"
                                onChange={handleInputChange}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                name="pickUpLocationId"
                                label="Select"
                                value={formValues.pickUpLocationId}
                                helperText="Please select pick up location"
                                onChange={handleInputChange}
                            >
                                {data.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.locationName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                name="dropOffLocationId"
                                label="Select"
                                helperText="Please select drop off location"
                                value={formValues.dropOffLocationId}
                                onChange={handleInputChange}
                            >
                                {data.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.locationName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                name="paymentType"
                                label="Select"
                                value={formValues.paymentType}
                                helperText="Please select payment"
                                onChange={handleInputChange}
                            >
                                {payment.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Stack direction="row">
                        <FormButton
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                            color="secondary"
                            fullWidth
                            onClick={handleSubmit}>
                            Submit
                        </FormButton>
                    </Stack>
                </React.Fragment>
            </Paper>
        </Container>
    )
}

export default withRoot(CreateBooking);