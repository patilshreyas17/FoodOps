package com.foodOps.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodOps.Exception.RestaurantException;
import com.foodOps.Exception.UserException;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.service.RestaurantService;
import com.foodOps.service.UserService;

@RestController
@RequestMapping("/api/superadmin/restaurants")
public class SuperAdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @GetMapping("/pending")
    public ResponseEntity<List<Restaurant>> getPendingRestaurants(
            @RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            throw new UserException("Access denied. Only Super Admin can view pending restaurants.");
        }

        List<Restaurant> pendingRestaurants = restaurantService.getPendingRestaurants();
        return ResponseEntity.ok(pendingRestaurants);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Restaurant>> getAllRestaurants(
            @RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            throw new UserException("Access denied. Only Super Admin can view all restaurants.");
        }

        List<Restaurant> allRestaurants = restaurantService.getAllRestaurantsForAdmin();
        return ResponseEntity.ok(allRestaurants);
    }

    @PutMapping("/{restaurantId}/approve")
    public ResponseEntity<Restaurant> approveRestaurant(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            throw new UserException("Access denied. Only Super Admin can approve restaurants.");
        }

        Restaurant restaurant = restaurantService.approveRestaurant(restaurantId);
        return ResponseEntity.ok(restaurant);
    }

    @PutMapping("/{restaurantId}/reject")
    public ResponseEntity<Restaurant> rejectRestaurant(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {

        User user = userService.findUserProfileByJwt(jwt);

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            throw new UserException("Access denied. Only Super Admin can reject restaurants.");
        }

        Restaurant restaurant = restaurantService.rejectRestaurant(restaurantId);
        return ResponseEntity.ok(restaurant);
    }
}
