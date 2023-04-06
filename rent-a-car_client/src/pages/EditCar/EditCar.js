import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material'
import { useAuthContext } from '../../hooks/useAuthContext';
import FormButton from '../../components/Common/FormButton';
import * as carService from "../../services/carService.js"
import withRoot from '../../withRoot';

const initialValues = {
    model: "",
    make: "",
    regNumber: "",
    makeYear: "",
    dailyRate: "",
    doors: "",
    seats: "",
    fuel: "",
    transmission: "",
    navigationSystem: "",
    categoryId: "",
    airCondition: "",
    dealerId: "",
};
const EditCar = () => {
    const { carId } = useParams();
    const { user } = useAuthContext();
    const [formValues, setFormValues] = useState(initialValues);
    const navigate = useNavigate();
    const [formErrors, setFormErros] = useState({
        make: '',
        model: '',
        regNumber: '',
        makeYear: '',
        seats: '',
        doors: '',
        dailyRate: '',
    });

    const fuel = [
        {
            value: 'Diesel',
            label: 'Diesel',
        },
        {
            value: 'Petrol',
            label: 'Petrol',
        },
        {
            value: 'LPG',
            label: 'LPG',
        },
        {
            value: 'Hybrid',
            label: 'Hybrid',
        },
        {
            value: 'Electric',
            label: 'Electric',
        },
    ];

    const transmission = [
        {
            value: 'Automatic',
            label: 'Automatic',
        },
        {
            value: 'Manual',
            label: 'Manual',
        },
        {
            value: 'SemiAutomatic',
            label: 'SemiAutomatic',
        },
        {
            value: 'CVT',
            label: 'CVT',
        },
        {
            value: 'Electric',
            label: 'Electric',
        },
    ];

    const navigationSystem = [
        {
            value: 'true',
            label: 'Yes',
        },
        {
            value: 'false',
            label: 'No',
        },
    ];

    const airCondition = [
        {
            value: 'true',
            label: 'Yes',
        },
        {
            value: 'false',
            label: 'No',
        },
    ];
    
    useEffect(() => {
        carService.getById(carId)
            .then((car) => {
                setFormValues({ ...car });
            }).catch(err => {
                console.log(err);
            });
    }, [carId]);


    const getCategories = () => {
        return fetch('https://localhost:7016/api/Category')
            .then(res => res.json())
            .catch(() => {
                toast.error("Something went wrong!")
                navigate('/error');
            });
    }


    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    if (isLoading) {
        return <span><CircularProgress /></span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    formValues.dealerId = user.user.dealerId;

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const boolInputChange = (e) => {
        const { name, value } = e.target;
        if (value === false) {
            setFormValues({
                ...formValues,
                [name]: false,
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: true,
            });
        }
    };

    const formValidate = (e) => {
        const value = e.target.value;
        const errors = {};
        if (e.target.name === 'make' && (value.length < 2 || value.length > 20)) {
            errors.make = 'Make should be between 2 and 20 characters!';
        }

        if (e.target.name === 'model' && (value.length < 2 || value.length > 20)) {
            errors.model = 'Model should be between 2 and 20 characters!';
        }
        if (e.target.name === 'regNumber' && (value.length < 2 || value.length > 8)) {
            errors.regNumber = 'Registration number should be between 2 and 8 characters!';
        }
        if (e.target.name === 'makeYear' && (value < 2000 || value > 2023)) {
            errors.makeYear = 'Year of make should be between 2000 and 2023!';
        }
        if (e.target.name === 'seats' && (value < 2 || value > 10)) {
            errors.seats = 'Seats should be between 2 and 10!';
        }
        if (e.target.name === 'doors' && (value < 2 || value > 5)) {
            errors.doors = 'Doors should be between 2 and 5!';
        }
        if (e.target.name === 'dailyRate' && (value < 1 || value > 1000)) {
            errors.firstName = 'Daily rate should be between 1 and 1000!';
        }
        setFormErros(errors);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        carService.Update({ ...formValues })
        .then(() => {
        toast.success("You successfully updated a car!", { autoClose: 1000 })
        navigate(`/my-cars`)
    }).catch((error) => console.log(error))
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom align='center'>
                        Update your car
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <span
                            hidden={
                                formErrors?.make
                                    ? false
                                    : true
                            }
                            style={{ color: 'red', fontSize: '10px' }}>
                            {formErrors.make}
                        </span>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                id="make"
                                name="make"
                                label="Make"
                                fullWidth
                                value={formValues.make}
                                autoComplete="Make"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <span
                            hidden={
                                formErrors?.model
                                    ? false
                                    : true
                            }
                            style={{ color: 'red', fontSize: '10px' }}>
                            {formErrors.model}
                        </span>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                id="model"
                                name="model"
                                label="Model"
                                value={formValues.model}
                                fullWidth
                                autoComplete="Model"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <span
                            hidden={
                                formErrors.makeYear
                                    ? false
                                    : true
                            }
                            style={{ color: 'red', fontSize: '10px' }}>
                            {formErrors.makeYear}
                        </span>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                id="makeYear"
                                name="makeYear"
                                value={formValues.makeYear}
                                label="Year"
                                fullWidth
                                autoComplete="Year"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <span
                            hidden={
                                formErrors?.regNumber
                                    ? false
                                    : true
                            }
                            style={{ color: 'red', fontSize: '10px' }}>
                            {formErrors.regNumber}
                        </span>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                id="regNumber"
                                name="regNumber"
                                label="Registration number"
                                fullWidth
                                value={formValues.regNumber}
                                autoComplete="Registration number"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <span
                            hidden={
                                formErrors?.seats
                                    ? false
                                    : true
                            }
                            style={{ color: 'red', fontSize: '10px' }}>
                            {formErrors.seats}
                        </span>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                id="seats"
                                name="seats"
                                label="Seats"
                                fullWidth
                                value={formValues.seats}
                                autoComplete="Seats"
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <span
                            hidden={
                                formErrors?.doors
                                    ? false
                                    : true
                            }
                            style={{ color: 'red', fontSize: '10px' }}>
                            {formErrors.doors}
                        </span>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                id="doors"
                                name="doors"
                                label="Doors"
                                value={formValues.doors}
                                fullWidth
                                variant="standard"
                                onChange={handleInputChange}
                                onBlur={formValidate}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >

                                <TextField

                                    required
                                    id="dailyRate"
                                    name="dailyRate"
                                    label="Daily rate"
                                    value={formValues.dailyRate}
                                    fullWidth
                                    autoComplete="Daily rate"
                                    variant="standard"
                                    onChange={handleInputChange}
                                />
                                <TextField

                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    helperText="Please select category"
                                    name="categoryId"
                                    value={formValues.categoryId}
                                    onChange={handleInputChange}
                                >
                                    {data && data.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.categoryName}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField

                                    id="outlined-select-currency"
                                    select
                                    value={formValues.fuel}
                                    name="fuel"
                                    label="Select"
                                    helperText="Please select fuel"
                                    onChange={handleInputChange}
                                >
                                    {fuel.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField

                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    name="transmission"
                                    value={formValues.transmission}
                                    helperText="Please select transmission"
                                    onChange={handleInputChange}
                                >
                                    {transmission.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField

                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value={formValues.navigationSystem}
                                    helperText="Please select navigation system"
                                    name="navigationSystem"
                                    onFocus={boolInputChange}
                                >
                                    {navigationSystem.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField

                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    name="airCondition"
                                    value={formValues.airCondition}
                                    helperText="Please select air condition"
                                    onFocus={boolInputChange}
                                >
                                    {airCondition.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Grid>

                    </Grid>
                    <Stack direction="row">
                        <FormButton
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                            color="secondary"
                            fullWidth
                            onClick={handleSubmit}>
                            Submit</FormButton>
                    </Stack>
                </React.Fragment>
            </Paper>
        </Container>
    )
}

export default withRoot(EditCar);