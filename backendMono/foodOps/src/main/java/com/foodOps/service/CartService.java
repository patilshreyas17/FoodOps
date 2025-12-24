package com.foodOps.service;

import com.foodOps.Exceptions.CartException;
import com.foodOps.Exceptions.CartItemException;
import com.foodOps.Exceptions.FoodException;
import com.foodOps.Exceptions.UserException;
import com.foodOps.model.Cart;
import com.foodOps.model.CartItem;
import com.foodOps.model.Food;
import com.foodOps.model.User;
import com.foodOps.request.AddCartItemRequest;
import com.foodOps.request.UpdateCartItemRequest;

public interface CartService {

    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

    public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

    public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

    public Long calculateCartTotals(Cart cart) throws UserException;

    public Cart findCartById(Long id) throws CartException;

    public Cart findCartByUserId(Long userId) throws CartException, UserException;

    public Cart clearCart(Long userId) throws CartException, UserException;




}
