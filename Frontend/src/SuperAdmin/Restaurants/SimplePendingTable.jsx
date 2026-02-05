import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPendingRestaurants } from "../../State/SuperAdmin/superAdmin.action";

const SimplePendingTable = () => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getPendingRestaurants());
  }, [dispatch]);

  console.log("SuperAdmin state:", superAdmin);
  console.log("Pending restaurants:", superAdmin.pendingRestaurants);

  return (
    <div>
      <h2>Pending Restaurants (Debug)</h2>
      <p>Loading: {superAdmin.loading ? "Yes" : "No"}</p>
      <p>Error: {superAdmin.error || "None"}</p>
      <p>Count: {superAdmin.pendingRestaurants?.length || 0}</p>
      
      {superAdmin.pendingRestaurants?.map((restaurant) => (
        <div key={restaurant.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{restaurant.name}</h3>
          <p>Owner: {restaurant.owner?.fullName}</p>
          <p>Status: {restaurant.approvalStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default SimplePendingTable;
