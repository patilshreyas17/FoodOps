import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../State/Customers/Restaurant/restaurant.action";
import Admin from "../Admin/Admin";
import { Box, CircularProgress, Typography } from "@mui/material";

const AdminRouters = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const token = localStorage.getItem("jwt");

  return <Admin />;
};

export default AdminRouters;
