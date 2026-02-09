package com.foodOps.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodOps.Exception.UserException;
import com.foodOps.model.Notification;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.service.NotificationService;
import com.foodOps.service.RestaurantService;
import com.foodOps.service.UserService;

@RestController
@RequestMapping("/api")
public class NotificationController {
	
	@Autowired
	private NotificationService notificationSerivce;
	@Autowired
	private UserService userService;
	@Autowired
	private RestaurantService restaurantService;
	
	@GetMapping("/notifications")
	public ResponseEntity<List<Notification>> findUsersNotification(
			@RequestHeader("Authorization") String jwt) throws UserException{
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Notification> notifications=notificationSerivce.findUsersNotification(user.getId());
		return new ResponseEntity<List<Notification>>(notifications,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/notifications/restaurant")
	public ResponseEntity<List<Notification>> findRestaurantNotifications(
			@RequestHeader("Authorization") String jwt) throws UserException{
		User user=userService.findUserProfileByJwt(jwt);
		Restaurant restaurant = restaurantService.getRestaurantsByUserId(user.getId());
		
		List<Notification> notifications=notificationSerivce.findRestaurantNotifications(restaurant.getId());
		return new ResponseEntity<List<Notification>>(notifications,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/notifications/{id}/read")
	public ResponseEntity<Notification> markNotificationAsRead(
			@PathVariable Long id) {
		Notification notification = notificationSerivce.markAsRead(id);
		return new ResponseEntity<Notification>(notification, HttpStatus.OK);
	}
	
	@PutMapping("/notifications/mark-all-read")
	public ResponseEntity<String> markAllNotificationsAsRead(
			@RequestHeader("Authorization") String jwt) throws UserException {
		User user=userService.findUserProfileByJwt(jwt);
		Restaurant restaurant = restaurantService.getRestaurantsByUserId(user.getId());
		
		notificationSerivce.markAllRestaurantNotificationsAsRead(restaurant.getId());
		return new ResponseEntity<String>("All notifications marked as read", HttpStatus.OK);
	}

}
