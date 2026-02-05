import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../State/Admin/Order/restaurants.order.action";
import AddIcon from "@mui/icons-material/Add";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "all" },
];

const RestaurantsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth } = useSelector((store) => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("order_status");

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        fetchRestaurantsOrder({
          restaurantId: restaurant.usersRestaurant?.id,
          orderStatus: filterValue,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [auth.jwt, filterValue, restaurant.usersRestaurant]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete("order_status");
    } else searchParams.set("order_status", e.target.value);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <div className="px-2">
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
              textAlign: 'center',
              p: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 165, 233, 0.2)'
            }}
          >
            <CardContent>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                No Orders Yet
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                You need to create your restaurant first before viewing orders.
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Once your restaurant is set up and approved, you'll be able to manage customer orders here.
              </Typography>
              <Button
                onClick={() => navigate("/admin/restaurant/add-restaurant")}
                variant="contained"
                startIcon={<AddIcon />}
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
      ) : (
        <div>
          <Card className="p-5">
            <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
              Order Status
            </Typography>
            <FormControl className="py-10" component="fieldset">
              <RadioGroup
                row
                name="category"
                value={filterValue ? filterValue : "all"}
                onChange={handleFilter}
              >
                {orderStatus.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                    sx={{ color: "gray" }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Card>

          <OrdersTable name={"All Orders"} />
        </div>
      )}
    </div>
  );
};

export default RestaurantsOrder;
