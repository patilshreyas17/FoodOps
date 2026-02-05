import { api } from "../../config/api";
import {
  GET_RESTAURANT_ANALYTICS_REQUEST,
  GET_RESTAURANT_ANALYTICS_SUCCESS,
  GET_RESTAURANT_ANALYTICS_FAILURE,
  GET_SUPER_ADMIN_ANALYTICS_REQUEST,
  GET_SUPER_ADMIN_ANALYTICS_SUCCESS,
  GET_SUPER_ADMIN_ANALYTICS_FAILURE,
  GET_CUSTOMER_ANALYTICS_REQUEST,
  GET_CUSTOMER_ANALYTICS_SUCCESS,
  GET_CUSTOMER_ANALYTICS_FAILURE,
  GET_RESTAURANT_ANALYTICS_BY_ID_REQUEST,
  GET_RESTAURANT_ANALYTICS_BY_ID_SUCCESS,
  GET_RESTAURANT_ANALYTICS_BY_ID_FAILURE,
} from "./analytics.actionType";

export const getRestaurantAnalytics = () => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ANALYTICS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.get("api/analytics/restaurant", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_ANALYTICS_SUCCESS, payload: data });
      console.log("restaurant analytics ", data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_ANALYTICS_FAILURE, payload: error.message });
    }
  };
};

export const getSuperAdminAnalytics = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SUPER_ADMIN_ANALYTICS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.get("api/analytics/superadmin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_SUPER_ADMIN_ANALYTICS_SUCCESS, payload: data });
      console.log("super admin analytics ", data);
    } catch (error) {
      dispatch({ type: GET_SUPER_ADMIN_ANALYTICS_FAILURE, payload: error.message });
    }
  };
};

export const getCustomerAnalytics = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CUSTOMER_ANALYTICS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.get("api/analytics/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_CUSTOMER_ANALYTICS_SUCCESS, payload: data });
      console.log("customer analytics ", data);
    } catch (error) {
      dispatch({ type: GET_CUSTOMER_ANALYTICS_FAILURE, payload: error.message });
    }
  };
};

export const getRestaurantAnalyticsById = (restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ANALYTICS_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.get(`api/analytics/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_ANALYTICS_BY_ID_SUCCESS, payload: data });
      console.log("restaurant analytics by id ", data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_ANALYTICS_BY_ID_FAILURE, payload: error.message });
    }
  };
};
