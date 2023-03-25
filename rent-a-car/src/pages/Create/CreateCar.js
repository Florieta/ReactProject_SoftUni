import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { CircularProgress, Alert } from '@mui/material'
import Button from '@mui/material/Button';
import FormButton from '../../components/form/FormButton.js';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import * as carService from "../../services/carService.js"
import { useAuthContext } from '../../hooks/useAuthContext';
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
    navigationSystem: "",
    imageUrl: "",
    categoryId: "",
    airCondition: "",
    dealerId: "",
};
const CreateCar = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [formErrors, setFormErros] = useState({
        make: '',
        model: '',
        regNumber: '',
        makeYear: '',
        seats: '',
        doors: '',
        dailyRate: '',
    });

   
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
            value: true,
            label: 'Yes',
        },
        {
            value: false,
            label: 'No',
        },
    ];

    const airCondition = [
        {
            value: true,
            label: 'Yes',
        },
        {
            value: false,
            label: 'No',
        },
    ];

    const getCategories = () => {
        return fetch('https://localhost:7016/api/Category')
            .then(res => res.json())
    }

    const { isLoading, isError, data, isFetching } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })
    console.log(data)
console.log(formValues.categoryId)
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
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
            toast.success("The photo was uploaded successfully!", { autoClose: 900 })
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
                    Add car
                </Typography>
                <Grid container spacing={4}>
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
                            required
                            id="make"
                            name="make"
                            label="Make"
                            value={formValues.make}
                            fullWidth
                            autoComplete="Make"
                            variant="standard"
                            onBlur={formValidate}
                            onChange={handleInputChange}
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
                            required
                            id="makeYear"
                            name="makeYear"
                            label="Year"
                            value={formValues.makeYear}
                            fullWidth
                            autoComplete="Year"
                            variant="standard"
                            onBlur={formValidate}
                            onChange={handleInputChange}

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
                            id="regNumber"
                            name="regNumber"
                            label="Registration number"
                            value={formValues.regNumber}
                            fullWidth
                            autoComplete="Registration number"
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
                            required
                            id="seats"
                            name="seats"
                            label="Seats"
                            fullWidth
                            autoComplete="Seats"
                            variant="standard"
                            value={formValues.seats}
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
                            id="doors"
                            name="doors"
                            label="Doors"
                            fullWidth
                            variant="standard"
                            value={formValues.doors}
                            onChange={handleInputChange}
                            onBlur={formValidate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <span
                            hidden={
                                formErrors?.dailyRate
                                    ? false
                                    : true
                            }
                            style={{ color: 'red', fontSize: '10px' }}>
                            {formErrors.dailyRate}
                        </span>
                        <TextField
                            id="dailyRate"
                            name="dailyRate"
                            label="Daily Rate"
                            fullWidth
                            variant="standard"
                            value={formValues.dailyRate}
                            onChange={handleInputChange}
                            onBlur={formValidate}

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
                                value={formValues.categoryId ?? ""}
                            >
                                {(isLoading || isFetching) && <CircularProgress />}
                                {isError && <Alert severity="error">This is an error alert — check it out!</Alert>}
                                {!isLoading && !isFetching && !isError && data && data.length > 0 &&
                                    data.map((option) => (
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
                                value={formValues.fuel}
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
                                value={formValues.transmission}
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
                                value={formValues.navigationSystem}
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
                                value={formValues.airCondition}
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