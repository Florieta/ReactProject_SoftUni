import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import profile_image from '../../assets/profile_image.jpg'
import { useAuthContext } from '../../hooks/useAuthContext';
import withRoot from '../../withRoot';

const MyProfile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    if (user.user.renterId) {
      navigate('/profile-renter');
    } else {
      navigate('/profile-dealer');
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" align='center' gutterBottom>
          Your profile
        </Typography>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: pink[400] }} aria-label="recipe">
              {user.user.firstName[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={onClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${user.user.firstName} ${user.user.lastName}`}
          subheader={user.user.email}
        />
        <CardMedia
          component="img"
          height="250"
          image={profile_image}
          alt="Avatar"
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary" align='center'>
            {user.user.userName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Phone number: {user.user.phoneNumber}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Registered as: {user.user.renterId ? "Renter" : "Dealer"}
          </Typography>
        </CardContent>

      </Paper>
    </Container>
  );
};

export default withRoot(MyProfile);