import * as actionTypes from "./superAdmin.actionType";

const initialState = {
  customers: [],
  pendingCustomers: [],
  pendingRestaurants: [],
  allRestaurants: [],
  loading: false,
  error: null,
};

const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS_REQUEST:
    case actionTypes.GET_PENDING_CUSTOMERS_REQUEST:
    case actionTypes.GET_PENDING_RESTAURANTS_REQUEST:
    case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
    case actionTypes.APPROVE_RESTAURANT_REQUEST:
    case actionTypes.REJECT_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
      };
    case actionTypes.GET_PENDING_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingCustomers: action.payload,
      };
    case actionTypes.GET_PENDING_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingRestaurants: action.payload,
      };
    case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allRestaurants: action.payload,
      };
    case actionTypes.APPROVE_RESTAURANT_SUCCESS:
    case actionTypes.REJECT_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.GET_CUSTOMERS_FAILURE:
    case actionTypes.GET_PENDING_CUSTOMERS_FAILURE:
    case actionTypes.GET_PENDING_RESTAURANTS_FAILURE:
    case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
    case actionTypes.APPROVE_RESTAURANT_FAILURE:
    case actionTypes.REJECT_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default superAdminReducer;
