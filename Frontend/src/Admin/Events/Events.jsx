import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createEventAction,
  getRestaurnatsEvents,
} from "../../State/Customers/Restaurant/restaurant.action";
import { useParams } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EventCard from "./EventCard";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const navigate = useNavigate();
  const [image, setimage] = useState("");
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  const jwt = localStorage.getItem("jwt");

  const [formValues, setFormValues] = useState(initialValues);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    const formattedDate = dayjs(date).format("MMMM DD, YYYY hh:mm A");
    setFormValues({ ...formValues, [dateType]: formattedDate });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt
      })
    );
    console.log("Image URL:", formValues, restaurant.usersRestaurant?.id);
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurnatsEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div>
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
                No Events Yet
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                You need to create your restaurant first before managing events.
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Once your restaurant is set up, you'll be able to create and manage events for your customers.
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
          <div className="p-5">
            <Button
              sx={{ padding: "1rem 2rem" }}
              onClick={handleOpenModal}
              variant="contained"
              color="primary"
            >
              Create New Event
            </Button>
          </div>

          <div className="mt-5 px-5 flex flex-wrap gap-5">
            {restaurant.restaurantsEvents.map((item) => (
              <EventCard item={item} />
            ))}
          </div>

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create New Event
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="image"
                      label="Image URL"
                      variant="outlined"
                      fullWidth
                      value={formValues.image}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="location"
                      label="Location"
                      variant="outlined"
                      fullWidth
                      value={formValues.location}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Event Name"
                      variant="outlined"
                      fullWidth
                      value={formValues.name}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Date and Time"
                        value={formValues.startedAt}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "startedAt")
                        }
                        inputFormat="MM/dd/yyyy hh:mm a"
                        className="w-full"
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date and Time"
                        value={formValues.endsAt}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "endsAt")
                        }
                        inputFormat="MM/dd/yyyy hh:mm a"
                        className="w-full"
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Events;
