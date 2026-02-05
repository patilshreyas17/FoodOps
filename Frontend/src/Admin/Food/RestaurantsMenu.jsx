import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuItemTable from './MenuItemTable'
import {
  Card,
  Typography,
  Button,
  Box,
  CardContent
} from '@mui/material'
import { Add } from '@mui/icons-material'

const RestaurantsMenu = () => {
  const navigate = useNavigate()
  const { restaurant } = useSelector(store => store)

  if (!restaurant.usersRestaurant || restaurant.usersRestaurant === '') {
    return (
      <div className="px-2">
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
                No Menu Items Yet
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                You need to create your restaurant first before managing menu items.
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Once your restaurant is set up, you'll be able to create and manage your menu items here.
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
      </div>
    )
  }

  return (
    <div className='px-2'>
      <MenuItemTable name={"All Menu Items"} />
    </div>
  )
}

export default RestaurantsMenu