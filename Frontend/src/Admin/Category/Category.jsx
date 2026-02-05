import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRestaurantById, getRestaurantsCategory } from '../../State/Customers/Restaurant/restaurant.action';
import { Box, Card, CardContent, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { Create, Add } from '@mui/icons-material';
import CreateCategory from './CreateCategory';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")
  const [openCreateCategory, setOpenCreateCategory] = React.useState(false);
  const handleOpenCreateCategory = () => setOpenCreateCategory(true);
  const handleCloseCreateCategory = () => setOpenCreateCategory(false);

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
                No Categories Yet
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                You need to create your restaurant first before managing categories.
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Once your restaurant is set up, you'll be able to create and manage food categories for your menu.
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
        <Card sx={{ mt: 1 }}>
          <CardHeader
            title={"Categories"}
            sx={{
              pt: 2,
              alignItems: "center",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
            action={<IconButton onClick={handleOpenCreateCategory}> <Create /></IconButton>}
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
                {restaurant.categories?.map((item, index) => (
                  <TableRow
                    className="cursor-pointer"
                    hover
                    key={item.id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>{item?.id}</TableCell>
                    <TableCell className="">
                      {item.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <Modal
        open={openCreateCategory}
        onClose={handleCloseCreateCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateCategory handleClose={handleCloseCreateCategory} />
        </Box>
      </Modal>
    </div>
  )
}

export default Category