package com.foodOps.controller;


import com.foodOps.Exceptions.RestaurantException;
import com.foodOps.Exceptions.UserException;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.request.CreateRestaurantRequest;
import com.foodOps.response.ApiResponse;
import com.foodOps.service.RestaurantService;
import com.foodOps.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/restaurants")
@AllArgsConstructor
public class AdminRestaurantController {
    private RestaurantService restaurantService;
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);


        Restaurant restaurant = restaurantService.createRestaurant(req,user);
        return ResponseEntity.ok(restaurant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody CreateRestaurantRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
        User user = userService.findUserProfileByJwt(jwt);

        Restaurant restaurant = restaurantService.updateRestaurant(id, req);
        return ResponseEntity.ok(restaurant);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRestaurantById(@PathVariable("id") Long restaurantId,
                                                            @RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
        User user = userService.findUserProfileByJwt(jwt);

        restaurantService.deleteRestaurant(restaurantId);

        ApiResponse res=new ApiResponse("Restaurant Deleted with id Successfully",true);
        return ResponseEntity.ok(res);
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateStataurantStatus(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws RestaurantException, UserException {

        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
        return ResponseEntity.ok(restaurant);

    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(
            @RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Restaurant restaurant = restaurantService.getRestaurantsByUserId(user.getId());
        return ResponseEntity.ok(restaurant);

    }



}
