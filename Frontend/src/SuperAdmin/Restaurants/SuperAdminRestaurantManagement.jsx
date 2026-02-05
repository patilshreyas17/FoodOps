import React, { useState } from 'react'
import { Typography, Box, Tabs, Tab } from '@mui/material'
import RestaurantTable from './RestaurantTable'
import PendingRestaurantTable from './PendingRestaurantTable'

const SuperAdminRestaurantManagement = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box width={"100%"} p={3}>
      <Typography variant="h4" gutterBottom>
        Restaurant Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Restaurants" />
          <Tab label="Pending Approvals" />
        </Tabs>
      </Box>

      {tabValue === 0 && <RestaurantTable name={"All Restaurants"} />}
      {tabValue === 1 && <PendingRestaurantTable />}
    </Box>
  )
}

export default SuperAdminRestaurantManagement
