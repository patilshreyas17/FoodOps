import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { restaurant } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(getRestaurantByUserId(token));
    }
  }, []);

  const handleCreateRestaurant = () => {
    navigate("/admin/add-restaurant");
  };

  return (
    <section className="px-4 lg:px-8 py-8 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ocean-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <header className="mb-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-plus-jakarta font-extrabold tracking-tighter text-5xl text-white mb-4 text-gradient-ocean">
            Restaurant Dashboard
          </h1>
          <p className="text-ocean-300 text-lg font-inter max-w-2xl mx-auto">
            Manage your restaurants with our advanced control panel. Monitor performance, track orders, and optimize operations.
          </p>
        </div>

        {/* Create Restaurant Button - Only show if no restaurant exists */}
        {(!restaurant.usersRestaurant || restaurant.usersRestaurant === '') && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={handleCreateRestaurant}
              variant="contained"
              startIcon={<AddIcon />}
              className="bg-gradient-to-r from-ocean-500 to-emerald-500 hover:from-ocean-600 hover:to-emerald-600 text-white font-plus-jakarta font-semibold py-3 px-8 rounded-xl shadow-neon transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon-lg"
            >
              Create Restaurant
            </Button>
          </div>
        )}
      </header>

      {/* Restaurant Details Section */}
      <div className="relative z-10">
        <Grid container spacing={3}>
          {restaurant.usersRestaurant && restaurant.usersRestaurant !== '' ? (
            <Grid item xs={12}>
              <Card className="glass-midnight rounded-2xl p-6 border border-ocean-400/20 shadow-neon">
                <CardContent>
                  <Typography variant="h5" className="text-white font-plus-jakarta font-bold mb-4">
                    {restaurant.usersRestaurant.approvalStatus === 'PENDING' ? 'Restaurant Under Review' :
                      restaurant.usersRestaurant.approvalStatus === 'REJECTED' ? 'Restaurant Rejected - Please Update' :
                        'Your Restaurant Details'}
                  </Typography>

                  {restaurant.usersRestaurant.approvalStatus === 'PENDING' && (
                    <Box className="mb-4 p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
                      <Typography variant="body1" className="text-yellow-300 mb-2">
                        ⏳ Your restaurant is pending approval from the admin.
                      </Typography>
                      <Typography variant="body2" className="text-yellow-200 mb-2">
                        You can edit your details below to make changes while waiting for approval.
                      </Typography>
                      <Typography variant="body2" className="text-yellow-100 text-sm">
                        📊 Analytics will be available once your restaurant is approved.
                      </Typography>
                    </Box>
                  )}

                  {restaurant.usersRestaurant.approvalStatus === 'REJECTED' && (
                    <Box className="mb-4 p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
                      <Typography variant="body1" className="text-red-300 mb-2">
                        ❌ Your restaurant was rejected by the admin.
                      </Typography>
                      <Typography variant="body2" className="text-red-200 mb-2">
                        Update your restaurant details below to resubmit for approval.
                      </Typography>
                      <Typography variant="body2" className="text-red-100 text-sm">
                        📊 Analytics will be available once your restaurant is approved.
                      </Typography>
                    </Box>
                  )}

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" className="text-ocean-300">
                        <strong>Name:</strong> {restaurant.usersRestaurant.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" className="text-ocean-300">
                        <strong>Status:</strong>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${restaurant.usersRestaurant.approvalStatus === 'APPROVED'
                          ? 'bg-green-500/20 text-green-300'
                          : restaurant.usersRestaurant.approvalStatus === 'PENDING'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-red-500/20 text-red-300'
                          }`}>
                          {restaurant.usersRestaurant.approvalStatus || 'PENDING'}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" className="text-ocean-300">
                        <strong>Cuisine:</strong> {restaurant.usersRestaurant.cuisineType}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" className="text-ocean-300">
                        <strong>Contact:</strong> {restaurant.usersRestaurant.contactInformation?.email || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Edit Button */}
                  <Box className="mt-4">
                    <Button
                      onClick={() => navigate(`/admin/edit-restaurant/${restaurant.usersRestaurant.id}`)}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      className="border-ocean-400 text-ocean-300 hover:border-ocean-300 hover:text-ocean-200"
                    >
                      Edit Restaurant Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Card className="glass-midnight rounded-2xl p-8 border border-ocean-400/20 shadow-neon text-center">
                <CardContent>
                  <Typography variant="h5" className="text-white font-plus-jakarta font-bold mb-4">
                    No Restaurant Yet
                  </Typography>
                  <Typography variant="body1" className="text-ocean-300 mb-4">
                    Create your first restaurant to start managing your business
                  </Typography>
                  <Button
                    onClick={handleCreateRestaurant}
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className="border-ocean-400 text-ocean-300 hover:border-ocean-300 hover:text-ocean-200"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </section>
  );
};

export default AdminDashboard;