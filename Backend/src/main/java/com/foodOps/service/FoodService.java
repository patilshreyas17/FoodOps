package com.foodOps.service;

import java.util.List;

import com.foodOps.Exception.FoodException;
import com.foodOps.Exception.RestaurantException;
import com.foodOps.model.Category;
import com.foodOps.model.Food;
import com.foodOps.model.Restaurant;
import com.foodOps.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest req,Category category,
						   Restaurant restaurant) throws FoodException, RestaurantException;

	void deleteFood(Long foodId) throws FoodException;
	
	public List<Food> getRestaurantsFood(Long restaurantId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String foodCategory) throws FoodException;
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId) throws FoodException;

	public Food updateAvailibilityStatus(Long foodId) throws FoodException;
}
