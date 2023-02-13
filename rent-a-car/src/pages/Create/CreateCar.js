import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as carService from "../../services/carService.js"
import { useAuthContext } from '../../hooks/useAuthContext';
import { CircularProgress, Alert } from '@mui/material'
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import FormButton from '../../components/form/FormButton.js';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from "axios";
import withRoot from '../../withRoot.js';


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
    navigationSystem: true,
    imageUrl: "",
    categoryId: "",
    airCondition: true,
    dealerId: "",
};
const CreateCar = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [invalidField, setInvalidField] = useState({
        make: false,
        model: false,
        regNumber: false,
        makeYear: false,
        seats: false,
        doors: false,
        dailyRate: false,
    });

    const constants = {
        make: {
            maxLenght: 15,
            errorMessage: 'Make should be less then 15 characters',
        },
        model: {
            minValue: 15,
            errorMessage: 'Model should be less then 15 characters',
        },
        regNumber: {
            maxLenght: 8,
            errorMessage: 'Registration number should be less then 8 characters',
        },
        makeYear: {
            maxLenght: 4,
            errorMessage: 'Year should be non negative or 0'
        },
        seats: {
            maxLenght: 2,
            errorMessage: 'Seats should be non negative or 0'
        },
        doors: {
            maxLenght: 1,
            errorMessage: 'Doors should be non negative or 0'
        },
        dailyRate: {
            maxLenght: 3,
            errorMessage: 'Daily rate should be non negative or 0'
        }
    }


    const handleFileChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0])
    };

    formValues.dealerId = user.user.dealerId;
    if (file) {
        formValues.imageUrl = file.name;
    }
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

    const getCategories = () => {
        return fetch('https://localhost:7016/api/Category')
            .then(res => res.json())
    }

    const { isLoading, isError, data, error, isFetching } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    if (isLoading) {
        return <span><CircularProgress /></span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });

        if (e.target.value.length > constants[e.target.name].maxLenght
            || (e.target.name === 'makeYear' && e.target.value < 1)
            || (e.target.name === 'seats' && e.target.value < 1)
            || (e.target.name === 'doors' && e.target.value < 1)
            || (e.target.name === 'dailyRate' && e.target.value < 1)) {
            setInvalidField((state) => {
                return {
                    ...state,
                    [e.target.name]: true
                }
            });

        } else {
            setInvalidField((state) => {
                return {
                    ...state,
                    [e.target.name]: false
                }
            });
        }
    };

    const handleUploadClick = (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        console.log(file.name)
        const url = 'https://localhost:7016/api/BlobStorage';
        const formData = new FormData();
        formData.append('imageFile', file);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then(() => {
            toast.success("The photo was uploaded successfully!", { autoClose: 1000 })
        });
    }
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

    const handleSubmit = (event) => {
        event.preventDefault();
        carService.create({ ...formValues })
            .then(() => {
                toast.success("You successfully added a car!")
                navigate('/my-cars');
            }).catch((error) => console.log(error))
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" align='center' gutterBottom>
                        Create car
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    invalidField?.make
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', 'padding-bottom': '6px', fontSize: '10px' }}>
                                {constants.make.errorMessage}
                            </span>
                            <TextField
                                required
                                id="make"
                                name="make"
                                label="Make"
                                value={formValues.make}
                                fullWidth
                                autoComplete="Make"
                                variant="standard"
                                error={invalidField?.make}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    invalidField?.model
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', 'padding-bottom': '6px', fontSize: '10px' }}>
                                {constants.model.errorMessage}
                            </span>
                            <TextField
                                required
                                id="model"
                                name="model"
                                label="Model"
                                value={formValues.model}
                                fullWidth
                                autoComplete="Model"
                                variant="standard"
                                onChange={handleInputChange}
                                error={invalidField?.model}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    invalidField?.makeYear
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', 'padding-bottom': '6px', fontSize: '10px' }}>
                                {constants.make.errorMessage}
                            </span>
                            <TextField
                                required
                                id="makeYear"
                                name="makeYear"
                                label="Year"
                                value={formValues.makeYear}
                                fullWidth
                                autoComplete="Year"
                                variant="standard"
                                error={invalidField?.makeYear}
                                onChange={handleInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    invalidField?.regNumber
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', 'padding-bottom': '6px', fontSize: '10px' }}>
                                {constants.regNumber.errorMessage}
                            </span>
                            <TextField
                                id="regNumber"
                                name="regNumber"
                                label="Registration number"
                                value={formValues.regNumber}
                                fullWidth
                                autoComplete="Registration number"
                                variant="standard"
                                onChange={handleInputChange}
                                error={invalidField?.regNumber}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    invalidField?.doors
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', 'padding-bottom': '6px', fontSize: '10px' }}>
                                {constants.regNumber.errorMessage}
                            </span>
                            <TextField
                                required
                                id="seats"
                                name="seats"
                                label="Seats"
                                fullWidth
                                autoComplete="Seats"
                                variant="standard"
                                value={formValues.seats}
                                onChange={handleInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    invalidField?.doors
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', 'padding-bottom': '6px', fontSize: '10px' }}>
                                {constants.regNumber.errorMessage}
                            </span>
                            <TextField
                                id="doors"
                                name="doors"
                                label="Doors"
                                fullWidth
                                variant="standard"
                                value={formValues.doors}
                                onChange={handleInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span
                                hidden={
                                    invalidField?.dailyRate
                                        ? false
                                        : true
                                }
                                style={{ color: 'red', 'padding-bottom': '6px', fontSize: '10px' }}>
                                {constants.regNumber.errorMessage}
                            </span>
                            <TextField
                                id="dailyRate"
                                name="dailyRate"
                                label="Daily Rate"
                                fullWidth
                                variant="standard"
                                value={formValues.dailyRate}
                                onChange={handleInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                    name="categoryId"
                                    helperText="Please select category"
                                    onChange={handleInputChange}

                                >
                                    {data.map((option) => (
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
                                    label="Select"
                                    name="fuel"
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
                                    name="navigationSystem"
                                    helperText="Please select navigation system"
                                    onChange={boolInputChange}

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
                                    helperText="Please select air condition"
                                    onChange={boolInputChange}

                                >
                                    {airCondition.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="imageUrl"
                                label="Image"
                                fullWidth
                                type='file'
                                variant="standard"
                                onChange={handleFileChange}
                            />
                            <Button variant="outlined"
                                color="secondary"
                                onClick={handleUploadClick}
                                sx={{ mt: 3, ml: 1 }}>
                                Upload
                            </Button>
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
    );
}

export default withRoot(CreateCar);