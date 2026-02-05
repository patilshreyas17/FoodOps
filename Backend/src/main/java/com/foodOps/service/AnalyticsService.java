package com.foodOps.service;

import java.util.Map;

public interface AnalyticsService {

    Map<String, Object> getRestaurantAnalytics(Long userId) throws Exception;

    Map<String, Object> getSuperAdminAnalytics() throws Exception;

    Map<String, Object> getCustomerAnalytics(Long userId) throws Exception;

    Map<String, Object> getRestaurantAnalyticsById(Long restaurantId) throws Exception;
}
