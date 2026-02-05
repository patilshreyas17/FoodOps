import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { getPlacesData } from './api/travelAdvisorAPI';
import List from './components/List/List';
import Map from './components/Map/Map';

const MapTravel = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coords, setCoords] = useState({ lat: 40.7128, lng: -74.0060 });
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapError, setMapError] = useState(false);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log('Geolocation error, using default location:', error);
          setCoords({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (places) {
      const filtered = places.filter((place) => Number(place.rating) > rating);
      setFilteredPlaces(filtered);
    }
  }, [rating, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log("API Data Received:", data);
          if (data) {
            setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching places:', error);
          setIsLoading(false);
        });
    }
  }, [type, bounds]);

  const onLoad = (autoC) => {
    console.log('Autocomplete loaded:', autoC);
  };

  const onPlaceChanged = () => {
    console.log('Place changed');
  };

  const handleMapError = () => {
    setMapError(true);
  };

  if (mapError) {
    return (
      <>
        <CssBaseline />
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Google Maps could not be loaded. This might be due to an ad blocker or network issue.
            Please disable ad blockers for this site and refresh the page.
          </Alert>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Map temporarily unavailable
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can still search for places using the search functionality above.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <CssBaseline />

      <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>

        <Box sx={{ width: { xs: '100%', md: '35%' }, p: 2 }}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Box>

        <Box sx={{ width: { xs: '100%', md: '65%' }, p: 2 }}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            setChildClicked={setChildClicked}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            onError={handleMapError}
          />
        </Box>

      </Box>
    </>
  );
};

export default MapTravel;
