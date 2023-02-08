
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from "../Typography/Typography";

const CarCard = ({ car }) => {


return (
  <Card sx={{ maxWidth: 500, ml: 60 }}>
    <CardMedia
      sx={{ height: 300 }}
      image={car.imageUrl}
      title="car"
    />
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        {car.make} {car.model} {car.makeYear}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        {car.dailyRate}€ per day
      </Typography>
      
      <Typography gutterBottom variant="h7" component="div">
        Category: {car.categoryName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        The car has {car.doors} doors and {car.seats} seats. The type of fuel is {car.fuel}.
        {car.transmission} transmission.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        A/C: {car.airCondition ? "Yes" : "No"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Navigation system: {car.navigationSystem ? "Yes" : "No"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Registration number: {car.regNumber}
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" color="secondary" size="large" href={`/booking/${car.id}`}>
          Book
        </Button>
    </CardActions>
  </Card>

);
};

export default CarCard;

/*
{user.token ? (user.user.renterId ? <Rate key={car.id} car={car} /> : <p></p>) : <p></p>}
{user.token ? (user.user.renterId
        ? <Button variant="contained" color="error" size="large" href={`/booking/${car.id}`}>
          Book
        </Button>
        : <p></p>)
        : <div><p>You need to login first in order to book!</p><Button variant="contained" color="info" size="medium" href={`/login`}>
          Login
        </Button></div>}*/