package com.foodOps.service;

import java.util.List;

import com.foodOps.Exception.FoodException;
import com.foodOps.Exception.RestaurantException;
import com.foodOps.model.Food;
import com.foodOps.model.IngredientCategory;
import com.foodOps.model.IngredientsItem;
import com.foodOps.repository.IngredientsCategoryRepository;

public interface IngredientsService {
	
	public IngredientCategory createIngredientsCategory(
			String name,Long restaurantId) throws RestaurantException;

	public IngredientCategory findIngredientsCategoryById(Long id) throws Exception;

	public List<IngredientCategory> findIngredientsCategoryByRestaurantId(Long id) throws Exception;
	
	public List<IngredientsItem> findRestaurantsIngredients(
			Long restaurantId);

	
	public IngredientsItem createIngredientsItem(Long restaurantId, 
			String ingredientName,Long ingredientCategoryId) throws Exception;

	public IngredientsItem updateStoke(Long id) throws Exception;
	
}
