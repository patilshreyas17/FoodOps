package com.foodOps.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodOps.Exception.RestaurantException;
import com.foodOps.Exception.UserException;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.request.CreateRestaurantRequest;
import com.foodOps.response.ApiResponse;
import com.foodOps.service.RestaurantService;
import com.foodOps.service.UserService;
import com.foodOps.service.NotificationService;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private NotificationService notificationService;

	@PostMapping()
	public ResponseEntity<Restaurant> createRestaurant(
			@RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, RestaurantException {

		User user = userService.findUserProfileByJwt(jwt);

		if (!user.getRole().name().equals("ROLE_RESTAURANT_OWNER")) {
			throw new UserException("Access denied. Only Restaurant Owners can create restaurants.");
		}

		Restaurant existingRestaurant = restaurantService.getRestaurantsByUserId(user.getId());
		if (existingRestaurant != null) {
			throw new UserException(
					"You already have a restaurant. Please edit your existing restaurant instead of creating a new one.");
		}

		System.out.println("----TRUE___-----" + jwt);
		Restaurant restaurant = restaurantService.createRestaurant(req, user);
		return ResponseEntity.ok(restaurant);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
		User user = userService.findUserProfileByJwt(jwt);

		if (!user.getRole().name().equals("ROLE_RESTAURANT_OWNER")) {
			throw new UserException("Access denied. Only Restaurant Owners can update restaurants.");
		}

		Restaurant restaurant = restaurantService.updateRestaurant(id, req);
		return ResponseEntity.ok(restaurant);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteRestaurantById(@PathVariable("id") Long restaurantId,
			@RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
		User user = userService.findUserProfileByJwt(jwt);

		restaurantService.deleteRestaurant(restaurantId);

		ApiResponse res = new ApiResponse("Restaurant Deleted with id Successfully", true);
		return ResponseEntity.ok(res);
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<Restaurant> updateStataurantStatus(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws RestaurantException, UserException {

		Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
		return ResponseEntity.ok(restaurant);

	}

	@GetMapping("/user")
	public ResponseEntity<Restaurant> findRestaurantByUserId(
			@RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		Restaurant restaurant = restaurantService.getRestaurantsByUserId(user.getId());
		return ResponseEntity.ok(restaurant);

	}
	
	@PostMapping("/notifications/send-promotion")
	public ResponseEntity<String> sendPromotionToAllCustomers(
			@RequestBody Map<String, String> request,
			@RequestHeader("Authorization") String jwt) throws UserException, RestaurantException {
		
		User restaurantOwner = userService.findUserProfileByJwt(jwt);
		Restaurant restaurant = restaurantService.getRestaurantsByUserId(restaurantOwner.getId());
		
		String message = request.get("message");
		if (message == null || message.trim().isEmpty()) {
			return new ResponseEntity<>("Message cannot be empty", HttpStatus.BAD_REQUEST);
		}
		
		try {
			notificationService.sendPromotionToAllCustomers(restaurant.getId(), message);
			return new ResponseEntity<>("Promotional notification sent to all customers successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to send promotional notification: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
