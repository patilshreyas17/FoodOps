package com.foodOps.service;

import com.foodOps.Exception.CartException;
import com.foodOps.Exception.CartItemException;
import com.foodOps.Exception.FoodException;
import com.foodOps.Exception.UserException;
import com.foodOps.model.Cart;
import com.foodOps.model.CartItem;
import com.foodOps.model.Food;
import com.foodOps.model.User;
import com.foodOps.request.AddCartItemRequest;
import com.foodOps.request.UpdateCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
