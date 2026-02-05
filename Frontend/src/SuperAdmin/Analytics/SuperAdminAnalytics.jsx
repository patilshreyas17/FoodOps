import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuperAdminAnalytics } from "../../State/Analytics/analytics.action";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  Store,
  People,
  ShoppingCart,
  AttachMoney,
  TrendingUp,
} from "@mui/icons-material";

const SuperAdminAnalytics = () => {
  const dispatch = useDispatch();
  const { superAdminAnalytics, loading, error } = useSelector((store) => store.analytics);

  useEffect(() => {
    dispatch(getSuperAdminAnalytics());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography color="error">Error loading analytics: {error}</Typography>
      </Box>
    );
  }

  if (!superAdminAnalytics) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography>No analytics data available</Typography>
      </Box>
    );
  }

  return (
    <Box className="px-4 lg:px-8 py-8">
      <Typography variant="h4" className="text-white font-bold mb-6">
        Platform Analytics
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={3}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center">
                <Store className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Total Restaurants
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {superAdminAnalytics.totalRestaurants || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center">
                <ShoppingCart className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Total Orders
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {superAdminAnalytics.totalOrders || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center">
                <AttachMoney className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    ₹{(superAdminAnalytics.totalRevenue || 0).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center">
                <People className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Total Users
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {superAdminAnalytics.userRoleBreakdown ? 
                      Object.values(superAdminAnalytics.userRoleBreakdown).reduce((a, b) => a + b, 0) : 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Details */}
      <Grid container spacing={3}>
        {/* User Role Breakdown */}
        <Grid item xs={12} md={4}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              User Role Breakdown
            </Typography>
            {superAdminAnalytics.userRoleBreakdown && 
             Object.keys(superAdminAnalytics.userRoleBreakdown).length > 0 ? (
              Object.entries(superAdminAnalytics.userRoleBreakdown).map(([role, count]) => (
                <Box key={role} className="mb-3">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{role.replace("ROLE_", "")}</Typography>
                    <Typography variant="body2">{count}</Typography>
                  </Box>
                  <Box
                    className="bg-gray-700 rounded-full h-2"
                    sx={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(count / Object.values(superAdminAnalytics.userRoleBreakdown).reduce((a, b) => a + b, 0)) * 100}%, #374151 ${(count / Object.values(superAdminAnalytics.userRoleBreakdown).reduce((a, b) => a + b, 0)) * 100}%, #374151 100%)`
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No user data available
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Restaurant Status Breakdown */}
        <Grid item xs={12} md={4}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              Restaurant Status Breakdown
            </Typography>
            {superAdminAnalytics.restaurantStatusBreakdown && 
             Object.keys(superAdminAnalytics.restaurantStatusBreakdown).length > 0 ? (
              Object.entries(superAdminAnalytics.restaurantStatusBreakdown).map(([status, count]) => (
                <Box key={status} className="mb-3">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{status}</Typography>
                    <Typography variant="body2">{count}</Typography>
                  </Box>
                  <Box
                    className="bg-gray-700 rounded-full h-2"
                    sx={{
                      background: `linear-gradient(to right, #10B981 0%, #10B981 ${(count / superAdminAnalytics.totalRestaurants) * 100}%, #374151 ${(count / superAdminAnalytics.totalRestaurants) * 100}%, #374151 100%)`
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No restaurant data available
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Top Performing Restaurants */}
        <Grid item xs={12} md={4}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              Top Restaurants by Revenue
            </Typography>
            {superAdminAnalytics.topRestaurants && 
             Object.keys(superAdminAnalytics.topRestaurants).length > 0 ? (
              Object.entries(superAdminAnalytics.topRestaurants).map(([name, revenue], index) => (
                <Box key={name} className="mb-3">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">
                      {index + 1}. {name.length > 20 ? name.substring(0, 20) + "..." : name}
                    </Typography>
                    <Typography variant="body2">₹{revenue.toLocaleString()}</Typography>
                  </Box>
                  <Box
                    className="bg-gray-700 rounded-full h-2"
                    sx={{
                      background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${(revenue / Math.max(...Object.values(superAdminAnalytics.topRestaurants))) * 100}%, #374151 ${(revenue / Math.max(...Object.values(superAdminAnalytics.topRestaurants))) * 100}%, #374151 100%)`
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No restaurant performance data available
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminAnalytics;
