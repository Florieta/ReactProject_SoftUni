import * as React from 'react';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import HomeLayout from './HomeLayout';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";

const backgroundImage =
  'https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/9ca26fe8-3db2-4e71-96f6-593f277014f3/Renault-Arkana-%288%29.jpg?width=800&fm=jpg&auto=format';

export default function ProductHero() {
  const { user} = useContext(AuthContext);
  const navigate = useNavigate();
  const onClick = (e) => {
    e.preventDefault();
    navigate("/register-renter")

  }
  return (
    <HomeLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', 
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Enjoy secret offers up to -70% off the best cars every Sunday.
      </Typography>
      {!user.token 
      ? <Button onClick={onClick}
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      : <div></div>}
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </HomeLayout>
  );
}