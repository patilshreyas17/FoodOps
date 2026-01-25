import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";

import darkTheme from "./theme/DarkTheme";
import Routers from "./Routers/Routers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Authentication/Action";
import { findCart } from "./State/Customers/Cart/cart.action";
import {
  getAllRestaurantsAction,
  getRestaurantById,
  getRestaurantByUserId,
} from "./State/Customers/Restaurant/restaurant.action";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {

    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
      dispatch(getAllRestaurantsAction(jwt));
    }
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user?.role == "ROLE_RESTAURANT_OWNER") {
      dispatch(getRestaurantByUserId(auth.jwt || jwt));
    }
  }, [auth.user]);

  return (
    <main className="min-h-screen bg-gradient-midnight relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-aurora-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <section className="relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-500/5 via-emerald-500/5 to-aurora-500/5 backdrop-blur-3xl"></div>
          <div className="relative z-20">
            <Routers />
          </div>
        </section>
      </ThemeProvider>
    </main>
  );
}

export default App;
