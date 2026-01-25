import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRestaurant, updateRestaurantStatus } from "../../State/Customers/Restaurant/restaurant.action";

export default function RestaurantCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleDeleteRestaurant = () => {
    dispatch(deleteRestaurant(item.id))
  }

  const handleUpdateRestaurantStatus = () => {
    dispatch(updateRestaurantStatus(item.id))
  }

  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 shadow-glass transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-glass-lg">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#e91e63", color: "white" }}
            aria-label="recipe"
            className="font-plus-jakarta font-extrabold"
          >
            {item.name?.charAt(0)?.toUpperCase() || 'R'}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" className="text-gray-400 hover:text-white transition-colors duration-300">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography className="font-plus-jakarta font-semibold text-white">
            {item.name}
          </Typography>
        }
        subheader={
          <Typography className="text-gray-400 text-sm">
            {item.open ? "Open Now" : "Closed"}
          </Typography>
        }
      />
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="h-48 w-full object-cover transform transition-transform duration-300 hover:scale-110"
          src={item.imageUrl || "/api/placeholder/400/300"}
          alt={item.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardContent>
        <Typography variant="body2" className="text-gray-300 font-plus-jakarta">
          {item.description || "Delicious food waiting for you. Order now and enjoy the best taste in town!"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="flex w-full items-center justify-between px-2">
          <div>
            <IconButton
              onClick={handleDeleteRestaurant}
              aria-label="delete"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div>
            <Button
              color={item.open ? "warning" : "success"}
              onClick={handleUpdateRestaurantStatus}
              className="font-plus-jakarta font-medium transition-all duration-300 hover:scale-105"
            >
              {item.open ? "Close" : "Open"}
            </Button>
          </div>
          <div>
            <Button
              size="small"
              onClick={() => navigate(`/admin/restaurants/${item.id}`)}
              className="font-plus-jakarta font-medium text-pink-500 hover:text-pink-400 transition-all duration-300 hover:scale-105"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
