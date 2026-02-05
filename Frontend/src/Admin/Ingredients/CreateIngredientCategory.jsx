import React, { useState } from "react";
import { TextField, Button, makeStyles, Card, Modal, Box, Typography, CardContent } from "@mui/material";
import { Create, Add } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategoryAction } from "../../State/Customers/Restaurant/restaurant.action";
import { createIngredientCategory } from "../../State/Admin/Ingredients/Action";

const CreateIngredientCategoryForm = ({ handleClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
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
              No Restaurant Yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
              You need to create your restaurant first before creating ingredient categories.
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
              Once your restaurant is set up, you'll be able to create and manage ingredient categories here.
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

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
    });
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };
    dispatch(createIngredientCategory({ data, jwt: auth.jwt || jwt }));
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
