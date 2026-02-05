import { api } from "../../config/api";
import {
  GET_CUSTOMERS_FAILURE,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_PENDING_CUSTOMERS_FAILURE,
  GET_PENDING_CUSTOMERS_REQUEST,
  GET_PENDING_CUSTOMERS_SUCCESS,
  GET_PENDING_RESTAURANTS_REQUEST,
  GET_PENDING_RESTAURANTS_SUCCESS,
  GET_PENDING_RESTAURANTS_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  APPROVE_RESTAURANT_REQUEST,
  APPROVE_RESTAURANT_SUCCESS,
  APPROVE_RESTAURANT_FAILURE,
  REJECT_RESTAURANT_REQUEST,
  REJECT_RESTAURANT_SUCCESS,
  REJECT_RESTAURANT_FAILURE
} from "./superAdmin.actionType";
import { getUser } from "../Authentication/Action";

export const getCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CUSTOMERS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.get("api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data });
      console.log("created restaurant ", data);
    } catch (error) {
      dispatch({ type: GET_CUSTOMERS_FAILURE, error: error.message });
    }
  };
};

export const getPendingCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PENDING_CUSTOMERS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.get("api/pending-customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_PENDING_CUSTOMERS_SUCCESS, payload: data });
      console.log("pending customers ", data);
    } catch (error) {
      dispatch({ type: GET_PENDING_CUSTOMERS_FAILURE, payload: error.message });
    }
  };
};

export const getPendingRestaurants = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PENDING_RESTAURANTS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.get("api/superadmin/restaurants/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_PENDING_RESTAURANTS_SUCCESS, payload: data });
      console.log("pending restaurants ", data);
    } catch (error) {
      console.error("Error fetching pending restaurants:", error);
      dispatch({ type: GET_PENDING_RESTAURANTS_FAILURE, payload: error.message });
    }
  };
};

export const getAllRestaurants = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      console.log("Making API call to get all restaurants...");
      const { data } = await api.get("api/superadmin/restaurants/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
      console.log("all restaurants API response:", data);
    } catch (error) {
      console.error("Error fetching all restaurants:", error);
      dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error.message });
    }
  };
};

export const approveRestaurant = (restaurantId) => {
  console.log("approveRestaurant action called with ID:", restaurantId);
  return async (dispatch) => {
    dispatch({ type: APPROVE_RESTAURANT_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      console.log("Making approve request to API...");
      const { data } = await api.put(`api/superadmin/restaurants/${restaurantId}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: APPROVE_RESTAURANT_SUCCESS, payload: data });
      dispatch(getPendingRestaurants());
      dispatch(getAllRestaurants());
      dispatch(getUser(token));
    } catch (error) {
      dispatch({ type: APPROVE_RESTAURANT_FAILURE, payload: error.message });
    }
  };
};

export const rejectRestaurant = (restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: REJECT_RESTAURANT_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await api.put(`api/superadmin/restaurants/${restaurantId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: REJECT_RESTAURANT_SUCCESS, payload: data });
      dispatch(getPendingRestaurants());
      dispatch(getAllRestaurants());
    } catch (error) {
      dispatch({ type: REJECT_RESTAURANT_FAILURE, payload: error.message });
    }
  };
};