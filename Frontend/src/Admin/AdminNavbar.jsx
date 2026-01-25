import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ocean } from "@mui/material/colors";
import { useState } from "react";
import { logout } from "../State/Authentication/Action";
import Auth from "../customers/pages/Auth/Auth";
import { IconButton } from "@mui/material";

const AdminNavbar = ({ handleOpenSideBar }) => {
  const navigate = useNavigate();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  return (
    <nav className="lg:hidden px-5 z-50 py-4 lg:px-20 flex justify-between bg-gradient-to-r from-ocean-600 to-emerald-600 backdrop-filter backdrop-blur-xl border-b border-ocean-400/20 shadow-neon">
      <div className="flex items-center space-x-4">
        <div className="lg:mr-10 cursor-pointer flex items-center space-x-4 transition-all duration-300 ease-in-out hover:scale-[1.02]">
          <IconButton
            onClick={handleOpenSideBar}
            className="text-white hover:bg-white/10 transition-all duration-300 shadow-neon-sm hover:shadow-neon"
          >
            <MenuIcon className="text-white" />
          </IconButton>
          <li className="logo font-plus-jakarta font-extrabold tracking-tighter text-white text-2xl list-none text-gradient-ocean">
            Food Ops
          </li>
        </div>
      </div>

      {/* Animated notification indicator */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <IconButton className="text-white hover:bg-white/10 transition-all duration-300">
            <ShoppingCartIcon className="text-white" />
          </IconButton>
          {cart?.cart?.items?.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-aurora-500 rounded-full animate-pulse"></span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
