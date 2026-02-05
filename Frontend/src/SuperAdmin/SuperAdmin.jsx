import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSideBar";
import SuperAdminCustomerTable from "./SuperAdminCustomerTable/SuperAdminCustomerTable";
import Customers from "./SuperAdminCustomerTable/Customers";
import RestaurantTable from "./Restaurants/RestaurantTable";
import SuperAdminRestaurant from "./Restaurants/SuperAdminRestaurant";
import RestaurantRequest from "./RestaurantRequest/RestaurantRequest";
import SuperAdminDashboard from "./SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminAnalytics from "./Analytics/SuperAdminAnalytics";

const SuperAdmin = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-52 flex-shrink-0">
        <SuperAdminSidebar open={true} handleClose={() => { }} />
      </div>

      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<SuperAdminDashboard />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/restaurants" element={<SuperAdminRestaurant />}></Route>
          <Route path="/restaurant-request" element={<RestaurantRequest />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
