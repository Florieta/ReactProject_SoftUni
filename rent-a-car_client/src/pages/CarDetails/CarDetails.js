import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CircularProgress, Alert } from '@mui/material'
import CarCard from '../../components/CarCard/CarCard';
import withRoot from '../../withRoot';

const CarDetails = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    
    const getCarById = () => {
        return fetch(`https://localhost:7016/api/Car/${carId}`)
            .then(res => res.json())
            .catch(() => {
                toast.error("Something went wrong!")
                navigate('/error');
            });
    }

    const {
        data: car,
        isError,
        isLoading,
        isFetching
    } = useQuery(['getCarKey'], getCarById, {
        retry: false,
        onError: () => toast.error('Something went wrong!', { autoClose: 1000 }),
        refetchOnWindowFocus: false,
    })

    return (
        <section id="car-details">
            {(isLoading || isFetching) && <CircularProgress />}
            {isError && <Alert severity="error">Something went wrong..</Alert>}
            {!isLoading && !isFetching && !isError && car &&
                (<div><CarCard key={car.id} car={car} /> </div>)}
        </section>
    );
};

export default withRoot(CarDetails);