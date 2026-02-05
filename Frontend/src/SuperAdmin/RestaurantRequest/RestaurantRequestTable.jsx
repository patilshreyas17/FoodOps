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
import { getPendingCustomers, getPendingRestaurants, approveRestaurant, rejectRestaurant } from "../../State/SuperAdmin/superAdmin.action";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

const RestaurantRequestTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  useEffect(() => {
    if (name.includes("Restaurant")) {
      dispatch(getPendingRestaurants());
    } else {
      dispatch(getPendingCustomers());
    }
  }, [dispatch, name]);

  const handleApproveUser = (userId) => {
    console.log("approve user ", userId);
  };

  const handleRejectUser = (userId) => {
    console.log("reject user ", userId);
  };

  const handleApproveRestaurant = (restaurantId) => {
    console.log("Approve button clicked for restaurant ID:", restaurantId);
    dispatch(approveRestaurant(restaurantId));
  };

  const handleRejectRestaurant = (restaurantId) => {
    dispatch(rejectRestaurant(restaurantId));
  };

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setDialogOpen(true);
  };

  return (
    <Box width={"100%"}>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>{name.includes("Restaurant") ? "Restaurant Name" : "Name"}</TableCell>
                <TableCell>{name.includes("Restaurant") ? "Owner Email" : "Email"}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{name.includes("Restaurant") ? "Cuisine Type" : "Role"}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                {!isDashboard && <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {(name.includes("Restaurant") ? superAdmin.pendingRestaurants : superAdmin.pendingCustomers)?.slice(0, isDashboard ? 7 : (name.includes("Restaurant") ? superAdmin.pendingRestaurants : superAdmin.pendingCustomers).length).map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {name.includes("Restaurant") ? item.name : item.fullName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {name.includes("Restaurant") ? item.owner?.email : item.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip label={name.includes("Restaurant") ? item.cuisineType : item.role} size="small" />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={(name.includes("Restaurant") ? item.approvalStatus : item.status) || "PENDING"}
                      color="warning"
                      size="small"
                    />
                  </TableCell>

                  {!isDashboard && <TableCell sx={{ textAlign: "center" }}>
                    {name.includes("Restaurant") ? (
                      <>
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(item)}
                          title="View Details"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleApproveRestaurant(item.id)}
                          title="Approve"
                          color="success"
                          sx={{ ml: 1 }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleRejectRestaurant(item.id)}
                          title="Reject"
                          color="error"
                          sx={{ ml: 1 }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleApproveUser(item.id)}
                          sx={{ mr: 1 }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleRejectUser(item.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>}
                </TableRow>
              ))}
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
          {selectedRestaurant && (
            <>
              <Button
                onClick={() => {
                  handleApproveRestaurant(selectedRestaurant.id);
                  setDialogOpen(false);
                }}
                color="success"
                variant="contained"
              >
                Approve
              </Button>
              <Button
                onClick={() => {
                  handleRejectRestaurant(selectedRestaurant.id);
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

export default RestaurantRequestTable;
