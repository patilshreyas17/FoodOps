import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCustomers, getAllRestaurants, approveRestaurant, rejectRestaurant } from "../../State/SuperAdmin/superAdmin.action";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

const RestaurantTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getAllRestaurants());
  }, [dispatch]);

  const handleApprove = (restaurantId) => {
    dispatch(approveRestaurant(restaurantId));
  };

  const handleReject = (restaurantId) => {
    dispatch(rejectRestaurant(restaurantId));
  };

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const allRestaurants = [
    ...(superAdmin.allRestaurants || []),
  ];

  console.log("All Restaurants from state:", superAdmin.allRestaurants);
  console.log("Processed allRestaurants:", allRestaurants);

  return (
    <Box width={"100%"}>
      <Card className="mt-1">
        <CardHeader
          title={name}
          subheader="All restaurants in the platform"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table aria-label="restaurants table">
            <TableHead>
              <TableRow>
                <TableCell>Restaurant Name</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Cuisine Type</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                {!isDashboard && <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {allRestaurants?.slice(0, isDashboard ? 7 : allRestaurants.length).map((restaurant) => (
                <TableRow
                  hover
                  key={restaurant.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.description?.substring(0, 50)}...
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {restaurant.owner?.fullName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {restaurant.owner?.email}
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {restaurant.cuisineType}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={restaurant.approvalStatus}
                      color={getStatusColor(restaurant.approvalStatus)}
                      size="small"
                    />
                  </TableCell>

                  {!isDashboard && (
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(restaurant)}
                        title="View Details"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      {restaurant.approvalStatus === 'PENDING' && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleApprove(restaurant.id)}
                            title="Approve"
                            color="success"
                          >
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleReject(restaurant.id)}
                            title="Reject"
                            color="error"
                          >
                            <CancelIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {(!allRestaurants || allRestaurants.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" color="text.secondary">
                      No restaurants found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Restaurant Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Restaurant Details</DialogTitle>
        <DialogContent>
          {selectedRestaurant && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedRestaurant.name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Owner:</strong> {selectedRestaurant.owner?.fullName}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {selectedRestaurant.owner?.email}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Cuisine Type:</strong> {selectedRestaurant.cuisineType}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong> {selectedRestaurant.description}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Contact:</strong> {selectedRestaurant.contactInformation?.email || 'N/A'}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {selectedRestaurant.address?.streetAddress}, {selectedRestaurant.address?.city}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Opening Hours:</strong> {selectedRestaurant.openingHours || 'N/A'}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Registration Date:</strong> {new Date(selectedRestaurant.registrationDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          {selectedRestaurant && selectedRestaurant.approvalStatus === 'PENDING' && (
            <>
              <Button
                onClick={() => {
                  handleApprove(selectedRestaurant.id);
                  setDialogOpen(false);
                }}
                color="success"
                variant="contained"
              >
                Approve
              </Button>
              <Button
                onClick={() => {
                  handleReject(selectedRestaurant.id);
                  setDialogOpen(false);
                }}
                color="error"
                variant="contained"
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default RestaurantTable;
