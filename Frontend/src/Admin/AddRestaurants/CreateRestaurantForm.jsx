import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createRestaurant } from "../../State/Customers/Restaurant/restaurant.action";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { CircularProgress, IconButton, Alert, Box, Typography } from "@mui/material";
const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun: 9:00 AM - 9:00 PM",
  images: [],
};

const CreateRestaurantForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      cuisineType: values.cuisineType,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        country: values.country,
      },
      contactInformation: {
        email: values.email,
        mobile: values.mobile,
        twitter: values.twitter,
        instagram: values.instagram,
      },
      openingHours: values.openingHours,
      images: values.images,
    };
    dispatch(createRestaurant({ data, token }));
    setIsSubmitted(true);
    console.log(data);

    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl ">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Restaurant
        </h1>

        {isSubmitted ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="h6" component="div">
                Restaurant Application Submitted Successfully!
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Your restaurant request has been submitted and is currently pending approval from the Super Admin.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                You will be notified once your restaurant is approved. You can check the status later.
              </Typography>
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Restaurant Name: {formik.values.name}
            </Typography>
          </Box>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Grid container spacing={2}>
              <Grid className="flex flex-wrap gap-5" item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />


                <label className="relative" htmlFor="fileInput">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                    <AddPhotoAlternateIcon
                      className="text-white"
                    />
                  </span>
                  {uploadImage && <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>}
                </label>

                <div className="flex flex-wrap gap-2">
                  {formik.values.images.map((image, index) => (
                    <div className="relative">
                      <img
                        className="w-24 h-24 object-cover"
                        key={index}
                        src={image}
                        alt={`ProductImage ${index + 1}`}
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          outline: "none",
                        }}
                      >
                        <CloseIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="cuisineType"
                  name="cuisineType"
                  label="Cuisine Type"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.cuisineType}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="openingHours"
                  name="openingHours"
                  label="Opening Hours"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.openingHours}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="streetAddress"
                  name="streetAddress"
                  label="Street Address"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.streetAddress}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="stateProvince"
                  name="stateProvince"
                  label="State/Province"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.stateProvince}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.postalCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="country"
                  name="country"
                  label="Country"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="mobile"
                  name="mobile"
                  label="Mobile"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.twitter}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="instagram"
                  name="instagram"
                  label="Instagram"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.instagram}
                />
              </Grid>

            </Grid>
            <Button variant="contained" color="primary" type="submit">
              Create Restaurant
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
