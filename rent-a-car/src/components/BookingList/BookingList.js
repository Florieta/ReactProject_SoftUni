import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Alert, CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useMutation } from "@tanstack/react-query";
import FormButton from '../form/FormButton';
import withRoot from '../../withRoot';
import CloseIcon from '@mui/icons-material/Close';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const BookingList = () => {

  const { user } = useAuthContext();

  const getMyBookings = () => {
    return fetch(`https://localhost:7016/api/Order/Renter/${user.user.renterId}`)
      .then(res => res.json())
  }

  const {
    data: bookings,
    isError,
    isLoading,
    isFetching,
    refetch
  } = useQuery(['getMyBookingsKey'], getMyBookings, {
    retry: false,
    onError: () => toast.error('Something went wrong!'),
    refetchOnWindowFocus: false,
  })

  const bookingDelete = useMutation((id) => axios.delete(`https://localhost:7016/api/Order/${id}`), {
    onSuccess: () => refetch() && toast.success('The booking was successfully cancelled!', {autoClose: 1000}),
    onError: () => toast.error('Something went wrong!', {autoClose: 1000})
  }
  );

  return (
    
    <TableContainer component={Paper} sx={{}} >
      {(isLoading || isFetching) && <CircularProgress />}
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Make & Model</TableCell>
            <TableCell align="right">Reg number</TableCell>
            <TableCell align="right">Pick up date&time</TableCell>
            <TableCell align="right">Drop off date&time</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Pick up location</TableCell>
            <TableCell align="right">Drop off location</TableCell>
            <TableCell align="right">Insurance</TableCell>
            <TableCell align="right">Payment type</TableCell>
            <TableCell align="right">Total amount(€)</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {isError && <Alert severity="error">This is an error alert — check it out!</Alert>}
          {!isLoading && !isFetching && !isError && bookings && bookings.length > 0 &&
            bookings.map((booking) => (
              <TableRow
                key={booking.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {booking.carMake} {booking.carModel}
                </TableCell>
                <TableCell align="right">{booking.regNumber}</TableCell>
                <TableCell align="right">{booking.pickUpDateAndTime}</TableCell>
                <TableCell align="right">{booking.dropOffDateAndTime}</TableCell>
                <TableCell align="right">{booking.duration}</TableCell>
                <TableCell align="right">{booking.pickUpLocation}</TableCell>
                <TableCell align="right">{booking.dropOffLocation}</TableCell>
                <TableCell align="right">{booking.insurance ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">{booking.paymentType}</TableCell>
                <TableCell align="right">{booking.totalAmount}</TableCell>
                <TableCell align="right">{booking.isActive === true ?  <DoneOutlineIcon /> :  <CloseIcon/>}</TableCell>
                {booking.isActive
                 ? <TableCell><FormButton color="secondary" size="small" onClick={() => window.confirm("Are you sure you want to cancel your reservation?")
                  && bookingDelete.mutate(booking.id)}>Cancel</FormButton></TableCell>
                 : <TableCell></TableCell>} 
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRoot(BookingList);

