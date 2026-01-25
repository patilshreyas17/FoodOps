import React, { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";
import AddressCard from "../../customers/components/Address/AddressCard";
import AddRestaurantCard from "./AddRestaurantCard";

const AdminDashboard = () => {
  const params = useParams();
  const { restaurant } = useSelector(state => state);
  console.log("params", params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantByUserId());
  }, []);

  return (
    <section className="px-4 lg:px-8 py-8 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ocean-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <header className="mb-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-plus-jakarta font-extrabold tracking-tighter text-5xl text-white mb-4 text-gradient-ocean">
            Restaurant Dashboard
          </h1>
          <p className="text-ocean-300 text-lg font-inter max-w-2xl mx-auto">
            Manage your restaurants with our advanced control panel. Monitor performance, track orders, and optimize operations.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-emerald rounded-2xl p-6 border border-emerald-400/20 shadow-glow transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-glow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-inter mb-1">Total Restaurants</p>
                <p className="text-3xl font-plus-jakarta font-extrabold text-white">{restaurant.usersRestaurant?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="glass-ocean rounded-2xl p-6 border border-ocean-400/20 shadow-neon transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-ocean-300 text-sm font-inter mb-1">Active Orders</p>
                <p className="text-3xl font-plus-jakarta font-extrabold text-white">24</p>
              </div>
              <div className="w-12 h-12 bg-ocean-500/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-ocean-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="glass-aurora rounded-2xl p-6 border border-aurora-400/20 shadow-glow transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-glow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-aurora-300 text-sm font-inter mb-1">Revenue Today</p>
                <p className="text-3xl font-plus-jakarta font-extrabold text-white">$1,247</p>
              </div>
              <div className="w-12 h-12 bg-aurora-500/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-aurora-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {restaurant.usersRestaurant.map((item) => (
          <article key={item.id} className="transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-2 animate-fade-in">
            <RestaurantCard item={item} />
          </article>
        ))}
        {restaurant.usersRestaurant.length < 1 && (
          <article className="transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-2 animate-fade-in">
            <AddRestaurantCard />
          </article>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
