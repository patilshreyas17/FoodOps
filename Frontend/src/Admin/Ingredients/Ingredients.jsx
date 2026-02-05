import { Create, Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CreateIngredientCategoryForm from "./CreateIngredientCategory";
import { useEffect, useState } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getIngredientCategory,
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "../../State/Admin/Ingredients/Action";
import { getRestaurantById } from "../../State/Customers/Restaurant/restaurant.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Ingredients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openIngredientCategory, setOpenIngredientCategory] = useState(false);
  const handleOpenIngredientCategory = () => setOpenIngredientCategory(true);
  const handleCloseIngredientCategory = () => setOpenIngredientCategory(false);

  const [openIngredient, setOpenIngredient] = useState(false);
  const handleOpenIngredient = () => setOpenIngredient(true);
  const handleCloseIngredient = () => setOpenIngredient(false);

  const handleUpdateStocke = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
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
                No Ingredients Yet
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                You need to create your restaurant first before managing ingredients.
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Once your restaurant is set up, you'll be able to create and manage ingredients for your menu items.
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
      ) : (
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={8}>
              <Card className="mt-1">
                <CardHeader
                  title={"Ingredients"}
                  sx={{
                    pt: 2,
                    alignItems: "center",
                    "& .MuiCardHeader-action": { mt: 0.6 },
                  }}
                  action={
                    <IconButton onClick={handleOpenIngredient}>
                      {" "}
                      <Create />
                    </IconButton>
                  }
                />
                <TableContainer className="h-[88vh] overflow-y-scroll">
                  <Table sx={{}} aria-label="table in dashboard">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>

                        <TableCell>Name</TableCell>

                        <TableCell>Category</TableCell>

                        <TableCell>Availability</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.ingredients.map((item, index) => (
                        <TableRow
                          className="cursor-pointer"
                          hover
                          key={item.id}
                          sx={{
                            "&:last-of-type td, &:last-of-type th": { border: 0 },
                          }}
                        >
                          <TableCell>{item?.id}</TableCell>

                          <TableCell className="">{item.name}</TableCell>
                          <TableCell className="">{item.category.name}</TableCell>

                          <TableCell className="">
                            <Button
                              onClick={() => handleUpdateStocke(item.id)}
                              color={item.inStoke ? "success" : "primary"}
                            >
                              {item.inStoke ? "in stock" : "out of stock"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card className="mt-1">
                <CardHeader
                  title={"Category"}
                  sx={{
                    pt: 2,
                    alignItems: "center",
                    "& .MuiCardHeader-action": { mt: 0.6 },
                  }}
                  action={
                    <IconButton onClick={handleOpenIngredientCategory}>
                      {" "}
                      <Create />
                    </IconButton>
                  }
                />
                <TableContainer>
                  <Table sx={{}} aria-label="table in dashboard">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>

                        <TableCell>Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.category?.map((item, index) => (
                        <TableRow
                          className="cursor-pointer"
                          hover
                          key={item.id}
                          sx={{
                            "&:last-of-type td, &:last-of-type th": { border: 0 },
                          }}
                        >
                          <TableCell>{item?.id}</TableCell>

                          <TableCell className="">{item.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>

          <Modal
            open={openIngredient}
            onClose={handleCloseIngredient}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CreateIngredientForm handleClose={handleCloseIngredient} />
            </Box>
          </Modal>

          <Modal
            open={openIngredientCategory}
            onClose={handleCloseIngredientCategory}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CreateIngredientCategoryForm
                handleClose={handleCloseIngredientCategory}
              />
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
