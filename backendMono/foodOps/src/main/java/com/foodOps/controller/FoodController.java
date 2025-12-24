package com.foodOps.controller;


import com.foodOps.Exceptions.FoodException;
import com.foodOps.model.Food;
import com.foodOps.service.FoodService;
import com.foodOps.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@AllArgsConstructor
public class FoodController {




    private FoodService foodService;


    private UserService userService;


    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(
            @RequestParam String name)  {
        List<Food> menuItem = foodService.searchFood(name);
        return ResponseEntity.ok(menuItem);
    }
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getMenuItemByRestaurantId(
            @PathVariable Long restaurantId,
            @RequestParam boolean vegetarian,
            @RequestParam boolean seasonal,
            @RequestParam boolean nonveg,
            @RequestParam(required = false) String food_category) throws FoodException {
        List<Food> menuItems= foodService.getRestaurantsFood(
                restaurantId,vegetarian,nonveg,seasonal,food_category);
        return ResponseEntity.ok(menuItems);
    }
}
