import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantAnalytics } from "../../State/Analytics/analytics.action";
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
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from "@mui/icons-material";

const RestaurantAnalytics = () => {
  const dispatch = useDispatch();
  const { restaurantAnalytics, loading, error } = useSelector((store) => store.analytics);

  useEffect(() => {
    dispatch(getRestaurantAnalytics());
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

  if (!restaurantAnalytics) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography>No analytics data available</Typography>
      </Box>
    );
  }

  return (
    <Box className="px-4 lg:px-8 py-8">
      <Typography variant="h4" className="text-white font-bold mb-6">
        Restaurant Analytics
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={3}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center">
                <ShoppingCart className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Total Orders
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {restaurantAnalytics.totalOrders || 0}
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
                <AttachMoney className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    ₹{(restaurantAnalytics.totalRevenue || 0).toLocaleString()}
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
                <People className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Total Customers
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {restaurantAnalytics.totalCustomers || 0}
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
                <TrendingUp className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Avg Order Value
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    ₹{restaurantAnalytics.totalOrders > 0
                      ? Math.round(restaurantAnalytics.totalRevenue / restaurantAnalytics.totalOrders)
                      : 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Details */}
      <Grid container spacing={3}>
        {/* Order Status Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              Order Status Breakdown
            </Typography>
            {restaurantAnalytics.orderStatusBreakdown &&
              Object.keys(restaurantAnalytics.orderStatusBreakdown).length > 0 ? (
              Object.entries(restaurantAnalytics.orderStatusBreakdown).map(([status, count]) => (
                <Box key={status} className="mb-3">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{status}</Typography>
                    <Typography variant="body2">{count}</Typography>
                  </Box>
                  <Box
                    className="bg-gray-700 rounded-full h-2"
                    sx={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(count / restaurantAnalytics.totalOrders) * 100}%, #374151 ${(count / restaurantAnalytics.totalOrders) * 100}%, #374151 100%)`
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No order data available
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Daily Revenue */}
        <Grid item xs={12} md={6}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              Daily Revenue (Last 7 Days)
            </Typography>
            {restaurantAnalytics.dailyRevenue &&
              Object.keys(restaurantAnalytics.dailyRevenue).length > 0 ? (
              Object.entries(restaurantAnalytics.dailyRevenue).map(([date, revenue]) => (
                <Box key={date} className="mb-3">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{date}</Typography>
                    <Typography variant="body2">₹{revenue.toLocaleString()}</Typography>
                  </Box>
                  <Box
                    className="bg-gray-700 rounded-full h-2"
                    sx={{
                      background: `linear-gradient(to right, #10B981 0%, #10B981 ${(revenue / Math.max(...Object.values(restaurantAnalytics.dailyRevenue))) * 100}%, #374151 ${(revenue / Math.max(...Object.values(restaurantAnalytics.dailyRevenue))) * 100}%, #374151 100%)`
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No revenue data available
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantAnalytics;
