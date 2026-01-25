import { Card } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AddRestaurantCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("/admin/add-restaurant")}
      className="flex items-center justify-center px-5 min-h-[30rem] bg-gradient-to-br from-midnight-800/30 to-midnight-900/30 backdrop-blur-xl border-2 border-dashed border-ocean-400/30 shadow-neon-sm transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-2 hover:border-ocean-500/60 hover:shadow-neon cursor-pointer group relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-shift bg-300% animate-gradient-shift opacity-10"></div>

      <div className="flex flex-col items-center space-y-6 relative z-10">
        <div className="p-6 rounded-full bg-gradient-to-br from-ocean-500/20 to-emerald-500/20 group-hover:from-ocean-500/30 group-hover:to-emerald-500/30 transition-all duration-300 shadow-neon-sm group-hover:shadow-neon">
          <AddIcon
            sx={{ fontSize: "3.5rem" }}
            className="text-ocean-400 group-hover:text-ocean-300 transition-colors duration-300"
          />
        </div>
        <div className="text-center">
          <h1 className="font-plus-jakarta font-extrabold tracking-tighter text-xl text-white mb-2 text-gradient-ocean">
            Add New Restaurant
          </h1>
          <p className="text-ocean-300 text-sm font-inter">
            Create and manage your restaurant
          </p>
        </div>

        {/* Animated particles */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-ocean-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-8 left-8 w-2 h-2 bg-aurora-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </Card>
  );
};

export default AddRestaurantCard;
