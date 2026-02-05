package com.foodOps.controller;

import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.service.AnalyticsService;
import com.foodOps.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @Autowired
    private UserService userService;

    @GetMapping("/restaurant")
    public ResponseEntity<Map<String, Object>> getRestaurantAnalytics(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_RESTAURANT_OWNER")) {
            throw new Exception("Access denied. Only Restaurant Owners can view restaurant analytics.");
        }

        Map<String, Object> analytics = analyticsService.getRestaurantAnalytics(user.getId());
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/superadmin")
    public ResponseEntity<Map<String, Object>> getSuperAdminAnalytics(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            throw new Exception("Access denied. Only Super Admin can view platform analytics.");
        }

        Map<String, Object> analytics = analyticsService.getSuperAdminAnalytics();
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/customer")
    public ResponseEntity<Map<String, Object>> getCustomerAnalytics(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_CUSTOMER")) {
            throw new Exception("Access denied. Only Customers can view customer analytics.");
        }

        Map<String, Object> analytics = analyticsService.getCustomerAnalytics(user.getId());
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<Map<String, Object>> getRestaurantAnalyticsById(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            throw new Exception("Access denied. Only Super Admin can view restaurant analytics.");
        }

        Map<String, Object> analytics = analyticsService.getRestaurantAnalyticsById(restaurantId);
        return ResponseEntity.ok(analytics);
    }
}
