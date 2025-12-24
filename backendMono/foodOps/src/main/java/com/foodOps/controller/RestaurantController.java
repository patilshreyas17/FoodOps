package com.foodOps.controller;

import com.foodOps.Exceptions.RestaurantException;
import com.foodOps.Exceptions.UserException;
import com.foodOps.dto.RestaurantDto;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.service.RestaurantService;
import com.foodOps.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurants")
@AllArgsConstructor
public class RestaurantController {


    private RestaurantService restaurantService;


    private UserService userService;


    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> findRestaurantByName(
            @RequestParam String keyword) {
        List<Restaurant> restaurant = restaurantService.searchRestaurant(keyword);

        return ResponseEntity.ok(restaurant);
    }


    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {

        List<Restaurant> restaurants = restaurantService.getAllRestaurant();


        return ResponseEntity.ok(restaurants);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @PathVariable Long id) throws RestaurantException {

        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return ResponseEntity.ok(restaurant);

    }

    @PutMapping("/{id}/add-favorites")
    public ResponseEntity<RestaurantDto> addToFavorite(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws RestaurantException, UserException {

        User user = userService.findUserProfileByJwt(jwt);
        RestaurantDto restaurant = restaurantService.addToFavorites(id, user);
        return ResponseEntity.ok(restaurant);

    }




}
