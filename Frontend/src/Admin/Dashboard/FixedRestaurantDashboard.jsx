import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import OrdersTable from "../Orders/OrderTable";
import MenuItemTable from "../Food/MenuItemTable";
import AvgCard from "../ReportCard/ReportCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellIcon from "@mui/icons-material/Sell";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const FixedRestaurantDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurant, menu, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  if (!restaurant.usersRestaurant || restaurant.usersRestaurant === '') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Card
          sx={{
            maxWidth: 600,
            textAlign: 'center',
            p: 4,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(14, 165, 233, 0.2)'
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              No Dashboard Yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
              You need to create your restaurant first before viewing the dashboard.
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
              Once your restaurant is set up, you'll be able to see detailed analytics and manage your operations here.
            </Typography>
            <Button
              onClick={() => navigate("/admin/restaurant/add-restaurant")}
              variant="contained"
              startIcon={<Add />}
              sx={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0284c7 0%, #059669 100%)',
                },
                color: 'white',
                fontWeight: 'bold',
                py: 1.5,
                px: 3
              }}
            >
              Create Restaurant
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  useEffect(() => {
    if (restaurant.usersRestaurant && (!menu.menuItems || menu.menuItems.length === 0)) {
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant.id,
          jwt: jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant?.id, menu.menuItems?.length, dispatch, jwt]);

  const totalOrders = restaurant.orders?.length || 0;
  const totalRevenue = restaurant.orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
  const totalMenuItems = menu.menuItems?.length || 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Restaurant Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's an overview of your restaurant {restaurant.usersRestaurant?.name}.
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AvgCard
            title="Total Orders"
            value={totalOrders}
            icon={<SellIcon />}
            isGrow={true}
            growValue={12}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AvgCard
            title="Total Revenue"
            value={Math.round(totalRevenue / 1000)}
            icon={<CurrencyRupeeIcon />}
            isGrow={true}
            growValue={8}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AvgCard
            title="Menu Items"
            value={totalMenuItems}
            icon={<FastfoodIcon />}
            isGrow={false}
            growValue={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AvgCard
            title="Avg Order"
            value={totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}
            icon={<CurrencyRupeeIcon />}
            isGrow={true}
            growValue={3}
          />
        </Grid>
      </Grid>

      {/* Restaurant Status */}
      {restaurant.usersRestaurant && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Restaurant Status
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="body2">
                <strong>Name:</strong> {restaurant.usersRestaurant.name}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {restaurant.usersRestaurant.open ? "Open" : "Closed"}
              </Typography>
              <Typography variant="body2">
                <strong>Approval:</strong> {restaurant.usersRestaurant.approvalStatus || "PENDING"}
              </Typography>
              <Typography variant="body2">
                <strong>Cuisine:</strong> {restaurant.usersRestaurant.cuisineType}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <OrdersTable name="Recent Orders" isDashboard={true} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Menu Items
              </Typography>
              <MenuItemTable isDashboard={true} name="Menu Items" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FixedRestaurantDashboard;
