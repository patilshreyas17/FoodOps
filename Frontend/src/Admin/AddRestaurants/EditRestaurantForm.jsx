import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { updateRestaurant, getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { CircularProgress, IconButton, Alert, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditRestaurantForm = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues: {
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
    },
    onSubmit: (values) => {
      const data = {
        ...values,
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
      };

      const token = localStorage.getItem("jwt");
      dispatch(updateRestaurant({ restaurantId: id, restaurantData: data, jwt: token }));
      navigate("/admin");
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && id) {
      if (!restaurant.usersRestaurant || restaurant.usersRestaurant.id !== parseInt(id)) {
        dispatch(getRestaurantByUserId(token));
      }
    }
  }, [dispatch, id, restaurant.usersRestaurant]);

  useEffect(() => {
    if (restaurant.usersRestaurant && restaurant.usersRestaurant.id === parseInt(id)) {
      const restaurantData = restaurant.usersRestaurant;
      formik.setValues({
        name: restaurantData.name || "",
        description: restaurantData.description || "",
        cuisineType: restaurantData.cuisineType || "",
        streetAddress: restaurantData.address?.streetAddress || "",
        city: restaurantData.address?.city || "",
        stateProvince: restaurantData.address?.state || "",
        postalCode: restaurantData.address?.postalCode || "",
        country: restaurantData.address?.country || "",
        email: restaurantData.contactInformation?.email || "",
        mobile: restaurantData.contactInformation?.mobile || "",
        twitter: restaurantData.contactInformation?.twitter || "",
        instagram: restaurantData.contactInformation?.instagram || "",
        openingHours: restaurantData.openingHours || "Mon-Sun: 9:00 AM - 9:00 PM",
        images: restaurantData.images || [],
      });
    }
  }, [restaurant.usersRestaurant]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="px-4 lg:px-8 py-8">
      <Typography variant="h4" className="text-white font-bold mb-6">
        Edit Restaurant Details
      </Typography>

      {restaurant.usersRestaurant?.approvalStatus === 'PENDING' && (
        <Alert severity="warning" className="mb-4">
          Your restaurant is currently pending approval. Editing details will update your submission.
        </Alert>
      )}

      {restaurant.usersRestaurant?.approvalStatus === 'REJECTED' && (
        <Alert severity="error" className="mb-4">
          Your restaurant was rejected. Updating details will resubmit for approval.
        </Alert>
      )}

      {restaurant.usersRestaurant?.approvalStatus === 'APPROVED' && (
        <Alert severity="info" className="mb-4">
          Your restaurant is approved. Editing details will require re-approval from admin.
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" className="text-white mb-3">Basic Information</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Restaurant Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="cuisineType"
              name="cuisineType"
              label="Cuisine Type"
              variant="outlined"
              value={formik.values.cuisineType}
              onChange={formik.handleChange}
              error={formik.touched.cuisineType && Boolean(formik.errors.cuisineType)}
              helperText={formik.touched.cuisineType && formik.errors.cuisineType}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={3}
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          {/* Address Information */}
          <Grid item xs={12}>
            <Typography variant="h6" className="text-white mb-3 mt-4">Address Information</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="streetAddress"
              name="streetAddress"
              label="Street Address"
              variant="outlined"
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              variant="outlined"
              value={formik.values.city}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="stateProvince"
              name="stateProvince"
              label="State/Province"
              variant="outlined"
              value={formik.values.stateProvince}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              variant="outlined"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="country"
              name="country"
              label="Country"
              variant="outlined"
              value={formik.values.country}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="h6" className="text-white mb-3 mt-4">Contact Information</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="mobile"
              name="mobile"
              label="Mobile"
              variant="outlined"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="openingHours"
              name="openingHours"
              label="Opening Hours"
              variant="outlined"
              value={formik.values.openingHours}
              onChange={formik.handleChange}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
            />
          </Grid>

          {/* Images */}
          <Grid item xs={12}>
            <Typography variant="h6" className="text-white mb-3 mt-4">Restaurant Images</Typography>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label className="relative" htmlFor="fileInput">
              <Button
                className="w-full py-3 border border-dashed border-gray-600 rounded-lg flex items-center justify-center space-x-2 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                component="span"
                disabled={uploadImage}
              >
                {uploadImage ? (
                  <CircularProgress size={20} />
                ) : (
                  <div className="flex items-center space-x-2">
                    <AddPhotoAlternateIcon />
                    <span>Add Restaurant Images</span>
                  </div>
                )}
              </Button>
            </label>
          </Grid>

          <Grid item xs={12}>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Restaurant ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outlined"
                onClick={() => navigate("/admin")}
                className="border-gray-600 text-gray-300 hover:border-gray-500 hover:text-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="bg-ocean-500 hover:bg-ocean-600 text-white"
              >
                {restaurant.usersRestaurant?.approvalStatus === 'REJECTED'
                  ? 'Resubmit for Approval'
                  : restaurant.usersRestaurant?.approvalStatus === 'PENDING'
                    ? 'Update Submission'
                    : 'Update & Request Re-approval'
                }
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditRestaurantForm;
