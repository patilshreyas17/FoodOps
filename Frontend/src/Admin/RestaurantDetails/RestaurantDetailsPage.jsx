import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";
import CreateRestaurantForm from "../AddRestaurants/CreateRestaurantForm";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, restaurant } = useSelector((store) => store);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER" && token && !restaurant.usersRestaurant) {
      dispatch(getRestaurantByUserId(token));
    }
  }, [auth.user, token, dispatch, restaurant.usersRestaurant]);

  useEffect(() => {
    if (!restaurant.usersRestaurant && !restaurant.loading) {
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
    }
  }, [restaurant.usersRestaurant, restaurant.loading]);

  const handleRestaurantCreated = () => {
    if (token) {
      dispatch(getRestaurantByUserId(token))
        .then(() => {
          navigate("/admin/restaurant");
        })
        .catch((error) => {
          console.error("Error refreshing restaurant data:", error);
        });
    }
  };

  if (restaurant.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (showCreateForm) {
    return <CreateRestaurantForm onSuccess={handleRestaurantCreated} />;
  }

  if (!restaurant.usersRestaurant) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Alert severity="info">
          <Typography variant="h6">No Restaurant Found</Typography>
          <Typography variant="body2">
            Please create a restaurant to get started.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setShowCreateForm(true)}
          >
            Create Restaurant
          </Button>
        </Alert>
      </Box>
    );
  }

  const rest = restaurant.usersRestaurant;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Restaurant Details
      </Typography>

      <Grid container spacing={3}>
        {/* Restaurant Basic Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Restaurant Name
                </Typography>
                <Typography variant="body1">
                  {rest.name}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {rest.description}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Cuisine Type
                </Typography>
                <Chip label={rest.cuisineType} size="small" />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Opening Hours
                </Typography>
                <Typography variant="body1">
                  {rest.openingHours}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={rest.open ? "Open" : "Closed"}
                  color={rest.open ? "success" : "default"}
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Approval Status
                </Typography>
                <Chip
                  label={rest.approvalStatus || "PENDING"}
                  color={
                    rest.approvalStatus === "APPROVED" ? "success" :
                      rest.approvalStatus === "REJECTED" ? "error" : "warning"
                  }
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {rest.contactInformation?.email}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Mobile
                </Typography>
                <Typography variant="body1">
                  {rest.contactInformation?.mobile}
                </Typography>
              </Box>
              {rest.contactInformation?.twitter && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Twitter
                  </Typography>
                  <Typography variant="body1">
                    {rest.contactInformation.twitter}
                  </Typography>
                </Box>
              )}
              {rest.contactInformation?.instagram && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Instagram
                  </Typography>
                  <Typography variant="body1">
                    {rest.contactInformation.instagram}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Street Address
                </Typography>
                <Typography variant="body1">
                  {rest.address?.streetAddress}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  City
                </Typography>
                <Typography variant="body1">
                  {rest.address?.city}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  State
                </Typography>
                <Typography variant="body1">
                  {rest.address?.state}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Postal Code
                </Typography>
                <Typography variant="body1">
                  {rest.address?.postalCode}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Country
                </Typography>
                <Typography variant="body1">
                  {rest.address?.country}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Owner Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Owner Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Owner Name
                </Typography>
                <Typography variant="body1">
                  {rest.owner?.fullName}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Owner Email
                </Typography>
                <Typography variant="body1">
                  {rest.owner?.email}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Registration Date
                </Typography>
                <Typography variant="body1">
                  {rest.registrationDate ?
                    new Date(rest.registrationDate).toLocaleDateString() :
                    'N/A'
                  }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Images */}
        {rest.images && rest.images.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Restaurant Images
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {rest.images.map((image, index) => (
                    <Box key={index} sx={{ position: 'relative' }}>
                      <img
                        src={image}
                        alt={`Restaurant ${index + 1}`}
                        style={{
                          width: 150,
                          height: 150,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/admin/restaurant')}
            >
              Manage Restaurant
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/restaurant/orders')}
            >
              View Orders
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/restaurant/menu')}
            >
              Manage Menu
            </Button>
            {rest.approvalStatus !== "APPROVED" && (
              <Alert severity="info" sx={{ flex: 1 }}>
                <Typography variant="body2">
                  Your restaurant is currently {rest.approvalStatus || "PENDING"}.
                  {rest.approvalStatus === "PENDING" &&
                    " Please wait for SuperAdmin approval to make your restaurant visible to customers."
                  }
                  {rest.approvalStatus === "REJECTED" &&
                    " Your restaurant request was rejected. Please contact support for more information."
                  }
                </Typography>
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantDetailsPage;
