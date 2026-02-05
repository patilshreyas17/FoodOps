import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Box, Rating, Alert } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Map = ({ setCoords, setBounds, coords, places, setChildClicked, onError }) => {
  const [mapError, setMapError] = useState(false);
  const isDesktop = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (typeof window.google === 'undefined' || !window.google.maps) {
        setMapError(true);
        onError && onError();
      }
    };

    const timer = setTimeout(checkGoogleMaps, 2000);
    return () => clearTimeout(timer);
  }, [onError]);

  if (mapError) {
    return (
      <Box sx={{ height: '85vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="warning">
          Google Maps could not be loaded. Please disable ad blockers and refresh the page.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '85vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          console.log('Google Maps loaded successfully');
        }}
      >
        {places?.map((place, i) => (
          <Box
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            sx={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              '&:hover': { zIndex: 2 },
            }}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} sx={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px' }}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place.name}
                  style={{ cursor: 'pointer', objectFit: 'cover', width: '100%', height: '70px' }}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </Box>
        ))}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
