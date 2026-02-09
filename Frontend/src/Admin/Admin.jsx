import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminSidebar from "./AdminSidebar";
import FixedRestaurantDashboard from "./Dashboard/FixedRestaurantDashboard";
import RestaurantsOrder from "./Orders/RestaurantsOrder";
import RestaurantsMenu from "./Food/RestaurantsMenu";
import AddMenuForm from "./Food/AddMenuForm";
import CreateRestaurantForm from "./AddRestaurants/CreateRestaurantForm";
import EditRestaurantForm from "./AddRestaurants/EditRestaurantForm";
import Events from "./Events/Events";
import Category from "./Category/Category";
import Ingredients from "./Ingredients/Ingredients";
import RestaurantAnalytics from "./Analytics/RestaurantAnalytics";
import RestaurantPromotions from "./Promotions/RestaurantPromotions";
import RestaurantNotifications from "./Notifications/RestaurantNotifications";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  getIngredientCategory,
  getIngredientsOfRestaurant,
} from "../State/Admin/Ingredients/Action";
import { getRestaurantsCategory } from "../State/Customers/Restaurant/restaurant.action";
import Details from "./Details/Details";
import AdminNavbar from "./AdminNavbar";
import { getUsersOrders } from "../State/Customers/Orders/Action";
import { fetchRestaurantsOrder } from "../State/Admin/Order/restaurants.order.action";
import RestaurantDetailsPage from "./RestaurantDetails/RestaurantDetailsPage";
import { getRestaurantByUserId } from "../State/Customers/Restaurant/restaurant.action";
import { Box, CircularProgress, Typography } from "@mui/material";

const ProtectedAnalyticsRoute = ({ children }) => {
  const { restaurant } = useSelector(store => store);
  const isRestaurantApproved = restaurant.usersRestaurant?.approvalStatus === "APPROVED";

  if (!isRestaurantApproved) {
    return <Navigate to="/admin/restaurant" replace />;
  }

  return children;
};

const Admin = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [openSideBar, setOpenSideBar] = useState(true);
  const [loading, setLoading] = useState(true);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      if (!auth.user) {
        const checkUserData = () => {
          const currentAuth = store.getState().auth;
          if (currentAuth.user?.role === "ROLE_RESTAURANT_OWNER") {
            dispatch(getRestaurantByUserId(jwt))
              .finally(() => setLoading(false));
          } else if (currentAuth.user) {
            setLoading(false);
          } else {
            setTimeout(checkUserData, 100);
          }
        };
        checkUserData();
      } else if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
        dispatch(getRestaurantByUserId(jwt))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [auth.user, jwt, dispatch]);

  useEffect(() => {
    if (restaurant.usersRestaurant && jwt) {
      const restaurantId = restaurant.usersRestaurant.id;

      dispatch(
        fetchRestaurantsOrder({
          restaurantId,
          jwt: jwt,
        })
      );

      const currentPath = window.location.pathname;

      if (currentPath.includes('/menu') || currentPath.includes('/add-menu')) {
        dispatch(
          getRestaurantsCategory({
            jwt: jwt,
            restaurantId,
          })
        );
      }

      if (currentPath.includes('/ingredients') || currentPath.includes('/category')) {
        dispatch(
          getIngredientCategory({ jwt, id: restaurantId })
        );
        dispatch(
          getIngredientsOfRestaurant({ jwt, id: restaurantId })
        );
      }
    }
  }, [restaurant.usersRestaurant?.id, jwt, dispatch]);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress />
        <Typography>Loading admin panel...</Typography>
      </Box>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-midnight relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-aurora-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="flex relative">
        <aside className="w-[20vw] hidden lg:block">
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </aside>

        <main className="flex-1 min-h-screen p-4 lg:p-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-midnight-900/50 to-midnight-950/50 backdrop-blur-3xl rounded-3xl"></div>

            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/orders" element={<RestaurantsOrder />} />
                <Route path="/menu" element={<RestaurantsMenu />} />
                <Route path="/add-menu" element={<AddMenuForm />} />
                <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
                <Route path="/edit-restaurant/:id" element={<EditRestaurantForm />} />
                <Route path="/event" element={<Events />} />
                <Route path="/ingredients" element={<Ingredients />} />
                <Route path="/category" element={<Category />} />
                <Route path="/details" element={<Details />} />
                <Route path="/restaurant-details" element={<RestaurantDetailsPage />} />
                <Route path="/promotions" element={<RestaurantPromotions />} />
                <Route path="/notifications" element={<RestaurantNotifications />} />
                <Route path="/analytics" element={
                  <ProtectedAnalyticsRoute>
                    <RestaurantAnalytics />
                  </ProtectedAnalyticsRoute>
                } />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Admin;
