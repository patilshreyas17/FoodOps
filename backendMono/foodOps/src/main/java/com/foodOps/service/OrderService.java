package com.foodOps.service;

import java.util.List;


import com.foodOps.Exceptions.CartException;
import com.foodOps.Exceptions.OrderException;
import com.foodOps.Exceptions.RestaurantException;
import com.foodOps.Exceptions.UserException;
import com.foodOps.model.Order;

import com.foodOps.model.User;
import com.foodOps.request.CreateOrderRequest;

public interface OrderService {

    public Order createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException
    //StripeException
    ;

    public Order updateOrder(Long orderId, String orderStatus) throws OrderException;

    public void cancelOrder(Long orderId) throws OrderException;

    public List<Order> getUserOrders(Long userId) throws OrderException;

    public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;


}
