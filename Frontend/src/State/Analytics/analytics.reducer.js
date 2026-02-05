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

const initialState = {
  restaurantAnalytics: null,
  superAdminAnalytics: null,
  customerAnalytics: null,
  restaurantAnalyticsById: null,
  loading: false,
  error: null,
};

export const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANT_ANALYTICS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_RESTAURANT_ANALYTICS_SUCCESS:
      return { ...state, loading: false, restaurantAnalytics: action.payload };
    case GET_RESTAURANT_ANALYTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_SUPER_ADMIN_ANALYTICS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_SUPER_ADMIN_ANALYTICS_SUCCESS:
      return { ...state, loading: false, superAdminAnalytics: action.payload };
    case GET_SUPER_ADMIN_ANALYTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_CUSTOMER_ANALYTICS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CUSTOMER_ANALYTICS_SUCCESS:
      return { ...state, loading: false, customerAnalytics: action.payload };
    case GET_CUSTOMER_ANALYTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_RESTAURANT_ANALYTICS_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_RESTAURANT_ANALYTICS_BY_ID_SUCCESS:
      return { ...state, loading: false, restaurantAnalyticsById: action.payload };
    case GET_RESTAURANT_ANALYTICS_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
