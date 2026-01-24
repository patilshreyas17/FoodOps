package com.foodOps.service;

import java.util.List;

import com.foodOps.Exception.CartException;
import com.foodOps.Exception.OrderException;
import com.foodOps.Exception.RestaurantException;
import com.foodOps.Exception.UserException;
import com.foodOps.model.Order;
import com.foodOps.model.PaymentResponse;
import com.foodOps.model.User;
import com.foodOps.request.CreateOrderRequest;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException, RazorpayException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
