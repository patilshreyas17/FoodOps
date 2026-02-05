import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerAnalytics } from "../../State/Analytics/analytics.action";
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
  ShoppingCart,
  AttachMoney,
  TrendingUp,
  Store,
} from "@mui/icons-material";

const CustomerAnalytics = () => {
  const dispatch = useDispatch();
  const { customerAnalytics, loading, error } = useSelector((store) => store.analytics);

  useEffect(() => {
    dispatch(getCustomerAnalytics());
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

  if (!customerAnalytics) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography>No analytics data available</Typography>
      </Box>
    );
  }

  return (
    <Box className="px-4 lg:px-8 py-8">
      <Typography variant="h4" className="text-white font-bold mb-6">
        My Analytics
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
                    {customerAnalytics.totalOrders || 0}
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
                    Total Spent
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    ₹{(customerAnalytics.totalSpent || 0).toLocaleString()}
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
                <TrendingUp className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Avg Order Value
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    ₹{Math.round(customerAnalytics.averageOrderValue || 0)}
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
                <Store className="mr-3" />
                <Box>
                  <Typography variant="h6" className="font-bold">
                    Favorite Places
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {customerAnalytics.favoriteRestaurants ? 
                      Object.keys(customerAnalytics.favoriteRestaurants).length : 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Details */}
      <Grid container spacing={3}>
        {/* Favorite Restaurants */}
        <Grid item xs={12} md={6}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              Favorite Restaurants
            </Typography>
            {customerAnalytics.favoriteRestaurants && 
             Object.keys(customerAnalytics.favoriteRestaurants).length > 0 ? (
              Object.entries(customerAnalytics.favoriteRestaurants).map(([name, count]) => (
                <Box key={name} className="mb-3">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{name}</Typography>
                    <Typography variant="body2">{count} orders</Typography>
                  </Box>
                  <Box
                    className="bg-gray-700 rounded-full h-2"
                    sx={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(count / Math.max(...Object.values(customerAnalytics.favoriteRestaurants))) * 100}%, #374151 ${(count / Math.max(...Object.values(customerAnalytics.favoriteRestaurants))) * 100}%, #374151 100%)`
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No order history available
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Order Status Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              Order Status Breakdown
            </Typography>
            {customerAnalytics.orderStatusBreakdown && 
             Object.keys(customerAnalytics.orderStatusBreakdown).length > 0 ? (
              Object.entries(customerAnalytics.orderStatusBreakdown).map(([status, count]) => (
                <Box key={status} className="mb-3">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{status}</Typography>
                    <Typography variant="body2">{count}</Typography>
                  </Box>
                  <Box
                    className="bg-gray-700 rounded-full h-2"
                    sx={{
                      background: `linear-gradient(to right, #10B981 0%, #10B981 ${(count / customerAnalytics.totalOrders) * 100}%, #374151 ${(count / customerAnalytics.totalOrders) * 100}%, #374151 100%)`
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

        {/* Monthly Spending Trend */}
        <Grid item xs={12}>
          <Paper className="p-6 bg-gray-800 text-white">
            <Typography variant="h6" className="font-bold mb-4">
              Monthly Spending Trend (Last 6 Months)
            </Typography>
            {customerAnalytics.monthlySpending && 
             Object.keys(customerAnalytics.monthlySpending).length > 0 ? (
              <Box display="flex" alignItems="end" height="200px" gap={2}>
                {Object.entries(customerAnalytics.monthlySpending).map(([month, spending]) => (
                  <Box key={month} flex={1} display="flex" flexDirection="column" alignItems="center">
                    <Box
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                      sx={{
                        height: `${Math.max((spending / Math.max(...Object.values(customerAnalytics.monthlySpending))) * 180, 10)}px`,
                        width: '100%',
                        maxWidth: '60px'
                      }}
                    />
                    <Typography variant="caption" className="mt-2 text-gray-400">
                      {month.substring(5)} {/* Show only month */}
                    </Typography>
                    <Typography variant="caption" className="text-gray-300">
                      ₹{spending.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No spending data available
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerAnalytics;
