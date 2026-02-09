import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  Container,
} from '@mui/material';
import { Campaign, Send, Store, Warning } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../config/api';
import { useNavigate } from 'react-router-dom';

const RestaurantPromotions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, restaurant } = useSelector((store) => store);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Check if restaurant is approved
  const isRestaurantApproved = restaurant.usersRestaurant?.approvalStatus === "APPROVED";

  // Redirect to restaurant creation if not approved
  useEffect(() => {
    if (!isRestaurantApproved) {
      navigate('/admin/restaurant');
    }
  }, [isRestaurantApproved, navigate]);

  // Show loading or redirect message if not approved
  if (!isRestaurantApproved) {
    return (
      <Container maxWidth="md" className="mt-8">
        <Alert severity="warning" icon={<Warning />}>
          <Typography variant="h6" className="mb-2">
            Restaurant Approval Required
          </Typography>
          <Typography variant="body2">
            You need to create and get your restaurant approved before you can send promotional notifications.
            Redirecting you to restaurant setup...
          </Typography>
          <Button 
            variant="outlined" 
            className="mt-3"
            onClick={() => navigate('/admin/restaurant')}
          >
            Go to Restaurant Setup
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleSendPromotion = async () => {
    if (!message.trim()) {
      setError('Promotion message cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/api/admin/restaurants/notifications/send-promotion', 
        { message }, 
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      
      setSuccess('Promotional notification sent to all customers successfully!');
      setMessage('');
    } catch (err) {
      setError('Failed to send promotional notification: ' + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-5 lg:px-20">
      <Typography variant="h4" className="mb-6">
        Send Promotional Notifications
      </Typography>

      <Card>
        <CardContent className="space-y-6">
          {/* Info Alert */}
          <Alert severity="info" className="mb-4">
            <Typography variant="body2">
              Send promotional messages and special offers to all customers who have ordered from your restaurant.
            </Typography>
          </Alert>

          {/* Promotion Message */}
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Promotional Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your promotional message here...&#10;&#10;Examples:&#10;&#10;• 20% OFF on all pizzas this weekend!&#10;&#10;• Buy 1 Get 1 Free on all pasta dishes&#10;&#10;• Special Diwali Offer: 30% discount on family meals"
            variant="outlined"
            helperText="Be creative and make your offer attractive!"
          />

          {/* Error Message */}
          {error && (
            <Alert severity="error" className="mt-2">
              {error}
            </Alert>
          )}

          {/* Success Message */}
          {success && (
            <Alert severity="success" className="mt-2">
              {success}
            </Alert>
          )}

          {/* Send Button */}
          <Box className="mt-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Campaign />}
              onClick={handleSendPromotion}
              disabled={loading}
              fullWidth
              size="large"
            >
              {loading ? 'Sending Promotion...' : 'Send Promotional Notification'}
            </Button>
          </Box>

          {/* Tips */}
          <Box className="mt-4">
            <Typography variant="body2" color="textSecondary">
              <strong>Tips for effective promotions:</strong>
              <ul className="mt-2 ml-4">
                <li>Keep messages short and compelling</li>
                <li>Include specific discounts or offers</li>
                <li>Add urgency (limited time, while supplies last)</li>
                <li>Mention specific menu items or categories</li>
              </ul>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantPromotions;
