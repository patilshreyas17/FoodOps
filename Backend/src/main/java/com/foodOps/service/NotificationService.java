package com.foodOps.service;

import java.util.List;

import com.foodOps.model.Notification;
import com.foodOps.model.Order;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);
	public List<Notification> findRestaurantNotifications(Long restaurantId);
	
	// New methods for bulk notifications
	public void sendNotificationToAllRestaurants(String message);
	public void sendPromotionToAllCustomers(Long restaurantId, String message);
	
	// New methods for notification management
	public Notification markAsRead(Long notificationId);
	public void markAllRestaurantNotificationsAsRead(Long restaurantId);

}
