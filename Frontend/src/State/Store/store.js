import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../Authentication/Reducer";
import restaurantReducer from "../Customers/Restaurant/Reducer";
import menuItemReducer from "../Customers/Menu/Reducer";
import cartReducer from "../Customers/Cart/Reducer";
import { orderReducer } from "../Customers/Orders/order.reducer";
import restaurantsOrderReducer from "../Admin/Order/restaurants.order.reducer";
import superAdminReducer from "../SuperAdmin/superAdmin.reducer";
import { ingredientReducer } from "../Admin/Ingredients/Reducer";
import { analyticsReducer } from "../Analytics/analytics.reducer";



const rootReducer = combineReducers({

    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantsOrder: restaurantsOrderReducer,
    ingredients: ingredientReducer,
    superAdmin: superAdminReducer,
    analytics: analyticsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))