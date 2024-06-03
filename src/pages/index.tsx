import React from 'react';
import { Container, Typography } from '@mui/material';
import ImageGallery from '../components/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
  return (
    <Container>
      <ImageGallery />
    </Container>
  );
};

export default Home;
