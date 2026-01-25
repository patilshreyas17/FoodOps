import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import OrdersTable from "../Orders/OrderTable";
import MenuItemTable from "../Food/MenuItemTable";
import AvgCard from "../ReportCard/ReportCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellIcon from "@mui/icons-material/Sell";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const RestaurantDashboard = () => {
  const { id } = useParams();
  const { restaurant } = useSelector(store => store);
  console.log("restaurants id ", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  console.log("restaurant", restaurant)
  return (
    <section className="px-4 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="font-plus-jakarta font-extrabold tracking-tighter text-4xl text-white mb-2">
          Restaurant Dashboard
        </h1>
        <p className="text-gray-400 text-lg">Monitor your restaurant performance and operations</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-glass p-6">
            <OrdersTable name={"Recent Order"} isDashboard={true} />
          </div>
        </article>
        <article className="transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-glass p-6">
            <MenuItemTable isDashboard={true} name={"Recently Added Menu"} />
          </div>
        </article>
      </div>
    </section>
  );
};

export default RestaurantDashboard;
