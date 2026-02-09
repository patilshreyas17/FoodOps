import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Checkbox,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../config/api';

const SuperAdminNotifications = () => {
  const dispatch = useDispatch();
  const [notificationType, setNotificationType] = useState('all');
  const [message, setMessage] = useState('');
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch all restaurants
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setRestaurantsLoading(true);
    try {
      const response = await api.get('/api/restaurants');
      setRestaurants(response.data);
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
    } finally {
      setRestaurantsLoading(false);
    }
  };

  const handleRestaurantToggle = (restaurantId) => {
    setSelectedRestaurants(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const handleSendNotification = async () => {
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let response;
      if (notificationType === 'all') {
        response = await api.post('/api/admin/notifications/send-to-all', { message });
      } else {
        response = await api.post('/api/admin/notifications/send-to-selected', { 
          message, 
          restaurantIds: selectedRestaurants 
        });
      }
      
      setSuccess('Notification sent successfully!');
      setMessage('');
      setSelectedRestaurants([]);
    } catch (err) {
      setError('Failed to send notification: ' + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-5 lg:px-20">
      <Typography variant="h4" className="mb-6">
        Send Notifications to Restaurants
      </Typography>

      <Card>
        <CardContent className="space-y-6">
          {/* Notification Type */}
          <FormControl component="fieldset">
            <Typography component="legend" variant="subtitle1">
              Notification Type
            </Typography>
            <RadioGroup
              row
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
            >
              <FormControlLabel 
                value="all" 
                control={<Radio />} 
                label="Send to All Restaurants" 
              />
              <FormControlLabel 
                value="selected" 
                control={<Radio />} 
                label="Send to Selected Restaurants" 
              />
            </RadioGroup>
          </FormControl>

          {/* Restaurant Selection (only show when "selected" is chosen) */}
          {notificationType === 'selected' && (
            <Box className="mt-4">
              <Typography variant="subtitle1" className="mb-2">
                Select Restaurants:
              </Typography>
              {restaurantsLoading ? (
                <Typography>Loading restaurants...</Typography>
              ) : (
                <Box className="max-h-60 overflow-y-auto border rounded p-3">
                  {restaurants.length === 0 ? (
                    <Typography color="textSecondary">No restaurants found</Typography>
                  ) : (
                    <FormGroup>
                      {restaurants.map((restaurant) => (
                        <FormControlLabel
                          key={restaurant.id}
                          control={
                            <Checkbox
                              checked={selectedRestaurants.includes(restaurant.id)}
                              onChange={() => handleRestaurantToggle(restaurant.id)}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2">
                                {restaurant.name}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {restaurant.address?.city || 'No location'} • 
                                Status: {restaurant.approvalStatus || 'Unknown'}
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </FormGroup>
                  )}
                </Box>
              )}
              {selectedRestaurants.length > 0 && (
                <Box className="mt-2">
                  <Typography variant="caption" color="primary">
                    {selectedRestaurants.length} restaurant(s) selected
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setSelectedRestaurants([])}
                    className="ml-2"
                  >
                    Clear selection
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {/* Message */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notification Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your notification message here..."
            variant="outlined"
          />

          {/* Error Message */}
          {error && (
            <Typography color="error" className="mt-2">
              {error}
            </Typography>
          )}

          {/* Success Message */}
          {success && (
            <Typography color="success" className="mt-2">
              {success}
            </Typography>
          )}

          {/* Send Button */}
          <Box className="mt-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Send />}
              onClick={handleSendNotification}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Sending...' : 'Send Notification'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminNotifications;
