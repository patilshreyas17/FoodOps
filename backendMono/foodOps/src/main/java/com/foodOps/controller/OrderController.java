package com.foodOps.controller;


import com.foodOps.Exceptions.CartException;
import com.foodOps.Exceptions.OrderException;
import com.foodOps.Exceptions.RestaurantException;
import com.foodOps.Exceptions.UserException;
import com.foodOps.model.CartItem;
import com.foodOps.model.Order;
import com.foodOps.model.PaymentResponse;
import com.foodOps.model.User;
import com.foodOps.request.CreateOrderRequest;
import com.foodOps.service.OrderService;
import com.foodOps.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor

public class OrderController {

    private OrderService orderService;;
    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest order,
                                             @RequestHeader("Authorization") String jwt)
            throws UserException, RestaurantException,
            CartException,

            OrderException {
        User user=userService.findUserProfileByJwt(jwt);
        System.out.println("req user "+user.getEmail());
        if(order!=null) {
            Order res = orderService.createOrder(order,user);
            return ResponseEntity.ok(res);

        }else throw new OrderException("Please provide valid request body");

    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getAllUserOrders(	@RequestHeader("Authorization") String jwt) throws OrderException, UserException{

        User user=userService.findUserProfileByJwt(jwt);

        if(user.getId()!=null) {
            List<Order> userOrders = orderService.getUserOrders(user.getId());
            return ResponseEntity.ok(userOrders);
        }else {
            return new ResponseEntity<List<Order>>(HttpStatus.BAD_REQUEST);
        }
    }

}
