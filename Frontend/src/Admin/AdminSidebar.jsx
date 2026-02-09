import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

import { useMediaQuery } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dashboard } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import { logout } from "../State/Authentication/Action";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BarChartIcon from '@mui/icons-material/BarChart';
import CampaignIcon from '@mui/icons-material/Campaign';
import NotificationsIcon from '@mui/icons-material/Notifications';

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "", isDashboard: true },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
  { title: "Events", icon: <EventIcon />, path: "/event" },
  { title: "Promotions", icon: <CampaignIcon />, path: "/promotions" },
  { title: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
  { title: "Analytics", icon: <BarChartIcon />, path: "/analytics", requireApproval: true },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export default function AdminSidebar({ handleClose, open }) {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurant } = useSelector(store => store);

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    } else if (item.title === "Restaurants") {
      navigate("/admin");
    } else {
      navigate(`/admin/restaurant${item.path}`);
    }
    handleClose()
  };

  const isRestaurantApproved = restaurant.usersRestaurant?.approvalStatus === "APPROVED";

  const filteredMenu = menu.filter(item => {
    if (item.requireApproval) {
      return isRestaurantApproved;
    }
    return true;
  });

  return (
    <aside className="">
      <React.Fragment>
        <Drawer
          sx={{ zIndex: 1 }}
          anchor={"left"}
          open={open}
          onClose={handleClose}
          variant={isSmallScreen ? "temporary" : "permanent"}
        >
          <div className="w-[70vw] lg:w-[20vw] group h-[100vh] flex flex-col justify-start text-sm space-y-1 bg-gradient-to-b from-midnight-900/90 to-midnight-950/90 backdrop-blur-3xl border-r border-ocean-400/20">
            {/* Enhanced header with animated gradient */}
            <div className="px-4 py-4 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-shift bg-300% animate-gradient-shift opacity-20"></div>
              <div className="relative z-10">
                <h2 className="font-plus-jakarta font-extrabold tracking-tighter text-lg text-white text-center mb-1">
                  Food Ops
                </h2>
                <p className="text-ocean-300 text-xs text-center font-inter">Admin Panel</p>
              </div>
            </div>

            {filteredMenu.map((item, i) => (
              <React.Fragment key={i}>
                <article
                  onClick={() => handleNavigate(item)}
                  className={`px-3 py-2 mx-2 flex items-center space-x-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out hover:bg-gradient-ocean hover:bg-opacity-20 hover:scale-[1.01] hover:shadow-neon-sm group border ${item.isDashboard
                    ? 'bg-gradient-to-r from-ocean-500/30 to-emerald-500/30 border-ocean-400/50 shadow-lg'
                    : 'border-transparent hover:border-ocean-400/30'
                    }`}
                >
                  <span className={`${item.isDashboard ? 'text-ocean-200' : 'text-ocean-400'} group-hover:text-ocean-300 transition-colors duration-300 text-sm`}>
                    {item.icon}
                  </span>
                  <span className={`font-plus-jakarta font-medium ${item.isDashboard ? 'text-white' : 'text-gray-300'} group-hover:text-white transition-colors duration-300 text-sm`}>
                    {item.title}
                  </span>
                  {/* Animated indicator */}
                  <div className={`ml-auto w-1.5 h-1.5 rounded-full ${item.isDashboard ? 'bg-ocean-400' : 'bg-ocean-500'
                    } opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}></div>
                </article>
                {i !== filteredMenu.length - 1 && <Divider className="mx-2 border-ocean-400/10" />}
              </React.Fragment>
            ))}
          </div>
        </Drawer>
      </React.Fragment>
    </aside>
  );
}
