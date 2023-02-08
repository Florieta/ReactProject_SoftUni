import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import Rating from '../Rating/Rating'
import ratingCalculator from '../../utils/ratingCalculator';
import { useEffect, useState } from 'react';
import * as ratingService from "../../services/ratingServices";

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};


const image = {
    height: 200,
    weight: 200,
    my: 4,
};

const CatalogItem = ({ car }) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        ratingService.getAllRatingsByCar(car.id)
            .then(ratingResult => {
                setRatings(ratingResult);
            });
    }, []);

    let averageRating = ratingCalculator(ratings.map(x => x.rate));

    return (

        <Grid item xs={12} md={4}>
            <Box sx={item}>
                <Box
                    component="img"
                    src={car.imageUrl}
                    alt="car"
                    sx={image}
                />
                <Typography variant="h5" align="center">
                    {car.make}  {car.model} {car.makeYear}
                </Typography>
                <Typography variant="h7" align="center">
                    Category: {car.categoryName}
                </Typography>
                <div className="rating">
                    {ratings.length === 0 ? <p>Rating: 0</p> : <p>Rating: {(averageRating.toFixed(2))}</p>}
                </div>
                <div className="rate">
                    <Rating key={car.id} averageRating={averageRating} />
                </div>
                <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    component="a"
                    href={`/catalog/${car.id}`}
                    sx={{ mt: 4 }}
                >
                    Details
                </Button>
            </Box>
        </Grid>

    );
};

export default CatalogItem;