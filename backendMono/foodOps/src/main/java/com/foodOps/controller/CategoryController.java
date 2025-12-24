package com.foodOps.controller;

import java.util.List;

import com.foodOps.service.CategoryService;
import com.foodOps.service.UserService;
import com.foodOps.Exceptions.UserException;
import com.foodOps.model.User;
import com.foodOps.service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodOps.Exceptions.RestaurantException;
import com.foodOps.model.Category;
import com.foodOps.service.CategoryService;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@NoArgsConstructor
public class CategoryController {


    public CategoryService categoryService;


    public UserService userService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createdCategory(
            @RequestHeader("Authorization")String jwt,
            @RequestBody Category category) throws RestaurantException, UserException {
        User user=userService.findUserProfileByJwt(jwt);

        Category createdCategory=categoryService.createCategory(category.getName(), user.getId());
        return new ResponseEntity<Category>(createdCategory,HttpStatus.OK);
    }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantsCategory(
            @PathVariable Long id,
            @RequestHeader("Authorization")String jwt) throws RestaurantException, UserException {
        User user=userService.findUserProfileByJwt(jwt);
        List<Category> categories=categoryService.findCategoryByRestaurantId(id);
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

}
