import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { useLoading } from '../../context/LoadingContext.jsx';

const GlobalSpinner = () => {
  const { loading } = useLoading();

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 9999,
        flexDirection: 'column'
      }}
      open={loading}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <CircularProgress color="inherit" size={60} thickness={4} />
        <Typography variant="h6" component="div">
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default GlobalSpinner;
