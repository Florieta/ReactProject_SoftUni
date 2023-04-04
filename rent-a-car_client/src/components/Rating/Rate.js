import { useAuthContext } from '../../hooks/useAuthContext';
import * as ratingService from '../../services/ratingServices';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState} from "react";


const Rate = ({car}) => {
    const [rating, setRating] = useState(0);
   const { user } = useAuthContext();

        const onVoteHandler = (newValue) => {
            const rate = newValue;
            setRating(rate);
            const carId = car.id;
            const renterId = user.user.renterId;

            ratingService.create({ rate, carId, renterId })
            .then(() => {
                toast.success("You successfully rated!", {autoClose: 1000})
           
        })};

    return (
        <div >
            {rating === 0
                ? <Box 
                    sx={{
                        '& > legend': { mt: 2 }, 
                    }}
                >
                    <Typography component="legend"></Typography>
                    <Rating 
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => onVoteHandler(newValue)} />
                </Box>
                : <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Typography component="legend">You have already rated!</Typography>
                    <Rating name="disabled" value={rating} disabled />
                </Box>}
        </div>
    )
}

export default Rate;