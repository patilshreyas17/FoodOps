package com.foodOps.controller;


import com.foodOps.service.FoodService;
import com.foodOps.service.RestaurantService;
import com.foodOps.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/food")
@AllArgsConstructor
public class AdminFoodController {

    private final FoodService foodService;

    private final UserService userService;

    private final RestaurantService restaurantService;



}
