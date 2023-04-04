import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../Typography/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://i.ytimg.com/vi/Ss7ZibEF8-g/maxresdefault.jpg',
    title: 'Compact',
    width: '30%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-GCZx2mXWPyW9r-eF5oW_ZtsTvprjRIpcUg&usqp=CAU',
    title: 'Economy',
    width: '30%',
  },
  {
    url: 'https://kong-proxy-aws.toyota-europe.com/c1-images/resize/ccis/680x680/zip/bg/product-token/bca5e681-6923-4b89-921b-b74d7a2bc67f/vehicle/3b56e3f0-96cf-4bfc-badd-89b2e54eca72/padding/50,50,50,50/image-quality/70/day-exterior-04_1k6.png',
    title: 'Intermediate',
    width: '40%',
  },
  {
    url: 'https://hips.hearstapps.com/hmg-prod/images/2022-nissan-qashqai-front-three-quarters-1613658275.jpg?crop=0.769xw:0.768xh;0.133xw,0.166xh&resize=1200:*',
    title: 'Intermediate SUV',
    width: '38%',
  },
  {
    url: 'https://i.insider.com/615dfa1a1725d20018b81fde?width=1136&format=jpeg',
    title: 'Electric',
    width: '28%',
  },
  {
    url: 'https://images.carexpert.com.au/crop/800/533/app/uploads/2022/03/C-300-003.jpg',
    title: 'Luxury',
    width: '34%',
  }
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}