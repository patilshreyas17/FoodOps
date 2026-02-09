package com.foodOps.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.foodOps.model.Notification;
import com.foodOps.model.Order;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.repository.NotificationRepository;
import com.foodOps.repository.RestaurantRepository;
import com.foodOps.repository.OrderRepository;

@Service
public class NotificationServiceImplementation implements NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public Notification sendOrderStatusNotification(Order order) {
		Notification notification = new Notification();
		notification.setMessage("your order is " + order.getOrderStatus() + " order id is - " + order.getId());
		notification.setCustomer(order.getCustomer());
		notification.setSentAt(new Date());

		return notificationRepository.save(notification);
	}

	@Override
	public void sendRestaurantNotification(Restaurant restaurant, String message) {
		String subject = "FoodOps Platform Notification";
		String emailMessage = "Dear Restaurant Owner,\n\n" + 
			"Restaurant: " + restaurant.getName() + "\n" +
			"Message: " + message + "\n\n" +
			"Best regards,\nFoodOps Team";
		
		sendEmail(restaurant.getOwner().getEmail(), subject, emailMessage);
		
		// Save to database
		Notification notification = new Notification();
		notification.setRestaurant(restaurant);
		notification.setMessage(message);
		notification.setSentAt(new Date());
		notification.setReadStatus(false);
		notificationRepository.save(notification);
	}

	@Override
	public void sendPromotionalNotification(User user, String message) {
		String subject = "Special Offer from FoodOps!";
		String emailMessage = "Dear " + user.getFullName() + ",\n\n" + 
			message + "\n\n" +
			"Visit FoodOps now!\nBest regards,\nFoodOps Team";
		
		sendEmail(user.getEmail(), subject, emailMessage);
		
		// Save to database
		Notification notification = new Notification();
		notification.setCustomer(user);
		notification.setMessage(message);
		notification.setSentAt(new Date());
		notification.setReadStatus(false);
		notificationRepository.save(notification);
	}
	
	// New method for bulk notifications to all restaurants
	public void sendNotificationToAllRestaurants(String message) {
		List<Restaurant> allRestaurants = restaurantRepository.findAll();
		for (Restaurant restaurant : allRestaurants) {
			sendRestaurantNotification(restaurant, message);
		}
	}
	
	// New method for promotional notifications to all restaurant customers
	public void sendPromotionToAllCustomers(Long restaurantId, String message) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
		if (restaurant == null) return;
		
		// Get all customers who ordered from this restaurant
		List<User> customers = orderRepository.findDistinctCustomersByRestaurantId(restaurantId);
		
		for (User customer : customers) {
			sendPromotionalNotification(customer, message);
		}
	}

	@Override
	public List<Notification> findUsersNotification(Long userId) {
		return notificationRepository.findByCustomerId(userId);
	}
	
	@Override
	public List<Notification> findRestaurantNotifications(Long restaurantId) {
		return notificationRepository.findByRestaurantId(restaurantId);
	}
	
	@Override
	public Notification markAsRead(Long notificationId) {
		Notification notification = notificationRepository.findById(notificationId)
			.orElseThrow(() -> new RuntimeException("Notification not found"));
		notification.setReadStatus(true);
		return notificationRepository.save(notification);
	}
	
	@Override
	public void markAllRestaurantNotificationsAsRead(Long restaurantId) {
		List<Notification> notifications = notificationRepository.findByRestaurantId(restaurantId);
		for (Notification notification : notifications) {
			if (!notification.isReadStatus()) {
				notification.setReadStatus(true);
				notificationRepository.save(notification);
			}
		}
	}
	
	private void sendEmail(String to, String subject, String message) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(to);
		mailMessage.setSubject(subject);
		mailMessage.setText(message);
		javaMailSender.send(mailMessage);
	}

}
