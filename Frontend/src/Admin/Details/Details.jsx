import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
// import XIcon from '@mui/icons-material/X';
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import AddIcon from "@mui/icons-material/Add";
import {
  updateRestaurant,
  updateRestaurantStatus,
} from "../../State/Customers/Restaurant/restaurant.action";

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleCreateRestaurant = () => {
    navigate("/admin/restaurant/add-restaurant");
  };

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: auth.jwt || jwt,
      })
    );
  };
  return (
    <div className="lg:px-20 px-5">
      {!restaurant.usersRestaurant || restaurant.usersRestaurant === '' ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Card
            sx={{
              maxWidth: 600,
              textAlign: "center",
              p: 4,
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
            }}
          >
            <CardContent>
              <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
                No Restaurant Details Yet
              </Typography>
              <Typography variant="body1" sx={{ color: "#94a3b8", mb: 2 }}>
                You need to create your restaurant first before viewing details.
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
                Once your restaurant is created, you'll be able to view and manage all your restaurant information here.
              </Typography>
              <Button
                onClick={handleCreateRestaurant}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0284c7 0%, #059669 100%)",
                  },
                  color: "white",
                  fontWeight: "bold",
                  py: 1.5,
                  px: 3,
                }}
              >
                Create Restaurant
              </Button>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <div>
          <div className="py-5 flex justify-center items-center gap-5">
            <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
              {restaurant.usersRestaurant?.name}
            </h1>
            <div>
              <Button
                onClick={handleRestaurantStatus}
                size="large"
                className="py-[1rem] px-[2rem]"
                variant="contained"
                color={restaurant.usersRestaurant?.open ? "error" : "primary"}
              >
                {restaurant.usersRestaurant?.open
                  ? "Close"
                  : "Open"}
              </Button>
            </div>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={<span className="text-gray-300"> Restaurant</span>}
                />
                <CardContent>
                  <div className="space-y-4 text-gray-200">
                    <div className="flex">
                      <p className="w-48">Owner</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.owner.fullName}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">Restaurant Name</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.name}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">Cuisine Type</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.cuisineType}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">Opning Hours</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.openingHours}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">Status</p>
                      <div className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.open ? (
                          <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                            Open
                          </span>
                        ) : (
                          <span className="text-black px-5 py-2 rounded-full bg-red-400">
                            Closed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Card>
                <CardHeader
                  title={<span className="text-gray-300"> Address</span>}
                />
                <CardContent>
                  <div className="space-y-3 text-gray-200">
                    <div className="flex">
                      <p className="w-48">Country</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.address.country}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">City</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.address.city}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">Postal Code</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.address.postalCode}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">Street Address</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        {restaurant.usersRestaurant?.address.streetAddress}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Card>
                <CardHeader
                  title={<span className="text-gray-300"> Contact</span>}
                />
                <CardContent>
                  <div className="space-y-3 text-gray-200">
                    <div className="flex">
                      <p className="w-48">Email</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>
                        {restaurant.usersRestaurant?.contactInformation.email}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-48">Mobile</p>
                      <p className="text-gray-400">
                        {" "}
                        <span className="pr-5">-</span>
                        {" +91"}
                        {restaurant.usersRestaurant?.contactInformation.mobile}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-48">Social</p>
                      <div className="text-gray-400 flex items-center pb-3">
                        {" "}
                        <span className="pr-5">-</span>{" "}
                        <a
                          target="_blank"
                          href={
                            restaurant.usersRestaurant?.contactInformation.instagram
                          }
                          rel="noreferrer"
                        >
                          <InstagramIcon sx={{ fontSize: "3rem" }} />
                        </a>
                        <a
                          className="ml-5"
                          href={
                            restaurant.usersRestaurant?.contactInformation.instagram
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <TwitterIcon sx={{ fontSize: "3rem" }} />
                        </a>
                        <a
                          className="ml-5"
                          href={
                            restaurant.usersRestaurant?.contactInformation.instagram
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <LinkedInIcon sx={{ fontSize: "3rem" }} />
                        </a>
                        <a
                          className="ml-5"
                          href={
                            restaurant.usersRestaurant?.contactInformation.instagram
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FacebookIcon sx={{ fontSize: "3rem" }} />
                        </a>
                      </div>
                    </div>
                    {/* <div className="flex">
                  <p className="w-48">Twitter</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon sx={{fontSize:"3rem"}} />
                    </a>
                  </p>
                </div> */}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Details;
