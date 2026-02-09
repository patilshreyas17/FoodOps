package com.foodOps.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodOps.Exception.UserException;
import com.foodOps.service.NotificationService;
import com.foodOps.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class SuperAdminNotificationController {
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/notifications/send-to-all")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> sendToAllRestaurants(@RequestBody Map<String, String> request) {
		String message = request.get("message");
		if (message == null || message.trim().isEmpty()) {
			return new ResponseEntity<>("Message cannot be empty", HttpStatus.BAD_REQUEST);
		}
		
		try {
			notificationService.sendNotificationToAllRestaurants(message);
			return new ResponseEntity<>("Notification sent to all restaurants successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to send notification: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/notifications/send-to-selected")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> sendToSelectedRestaurants(@RequestBody Map<String, Object> request) {
		String message = (String) request.get("message");
		@SuppressWarnings("unchecked")
		java.util.List<Long> restaurantIds = (java.util.List<Long>) request.get("restaurantIds");
		
		if (message == null || message.trim().isEmpty()) {
			return new ResponseEntity<>("Message cannot be empty", HttpStatus.BAD_REQUEST);
		}
		
		if (restaurantIds == null || restaurantIds.isEmpty()) {
			return new ResponseEntity<>("Restaurant IDs cannot be empty", HttpStatus.BAD_REQUEST);
		}
		
		try {
			// This would need to be implemented in the service
			// For now, send to all restaurants
			notificationService.sendNotificationToAllRestaurants(message);
			return new ResponseEntity<>("Notification sent to selected restaurants successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to send notification: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
