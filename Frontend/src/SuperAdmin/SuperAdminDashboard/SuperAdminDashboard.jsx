import React, { useEffect } from 'react'
import { Typography, Box, Grid, Card, CardContent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, getPendingRestaurants, getAllRestaurants } from '../../State/SuperAdmin/superAdmin.action'
import { getSuperAdminAnalytics } from '../../State/Analytics/analytics.action'
import SuperAdminAnalytics from '../Analytics/SuperAdminAnalytics'

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getPendingRestaurants());
    dispatch(getAllRestaurants());

    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(getSuperAdminAnalytics(token));
    }
  }, [dispatch]);

  const totalRestaurants = superAdmin.customers?.filter(user => user.role === "ROLE_RESTAURANT_OWNER").length || 0;
  const totalCustomers = superAdmin.customers?.filter(user => user.role === "ROLE_CUSTOMER").length || 0;
  const pendingRequests = superAdmin.pendingRestaurants?.length || 0;

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        SuperAdmin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Restaurants</Typography>
              <Typography variant="h4">{totalRestaurants}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h4">{totalCustomers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Requests</Typography>
              <Typography variant="h4">{pendingRequests}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Orders</Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Analytics Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Platform Analytics
        </Typography>
        <SuperAdminAnalytics />
      </Box>
    </div>
  )
}

export default SuperAdminDashboard