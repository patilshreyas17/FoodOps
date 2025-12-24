package com.foodOps.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.foodOps.Exceptions.UserException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.stripe.exception.StripeException;
import com.foodOps.Exceptions.CartException;
import com.foodOps.Exceptions.OrderException;
import com.foodOps.Exceptions.RestaurantException;
import com.foodOps.Exceptions.UserException;
import com.foodOps.model.Address;
import com.foodOps.model.Cart;
import com.foodOps.model.CartItem;
import com.foodOps.model.Notification;
import com.foodOps.model.Order;
import com.foodOps.model.OrderItem;
import com.foodOps.model.PaymentResponse;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.repository.AddressRepository;
import com.foodOps.repository.CartRepository;
import com.foodOps.repository.OrderItemRepository;
import com.foodOps.repository.OrderRepository;
import com.foodOps.repository.RestaurantRepository;
import com.foodOps.repository.UserRepository;
import com.foodOps.request.CreateOrderRequest;
@Service
@Transactional
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {



    private AddressRepository addressRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;


   // private PaymentService paymentSerive;


    //private NotificationService notificationService;



    @Override
    public Order createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException {
        Address shippAddress = order.getDeliveryAddress();
        Address savedAddress = addressRepository.save(shippAddress);

        if(!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
        }
        Optional<Restaurant> restaurant = restaurantRepository.findById(order.getRestaurantId());
        if(restaurant.isEmpty()) {
            throw new RestaurantException("Restaurant not found with id "+order.getRestaurantId());
        }
        Order createdOrder = new Order();

        createdOrder.setCustomer(user);
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setRestaurant(restaurant.get());

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getFood().getPrice()* cartItem.getQuantity());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }
        Long totalPrice = cartService.calculateCartTotals(cart);
        createdOrder.setTotalAmount(totalPrice);
        createdOrder.setRestaurant(restaurant.get());

        createdOrder.setItems(orderItems);
        Order savedOrder = orderRepository.save(createdOrder);
        restaurant.get().getOrders().add(savedOrder);

        return createdOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws OrderException {
        Order order=findOrderById(orderId);
        if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
            order.setOrderStatus(orderStatus);

            return orderRepository.save(order);
        }
        else throw new OrderException("Please Select A Valid Order Status");

    }

    @Override
    public void cancelOrder(Long orderId) throws OrderException {
        Order order =findOrderById(orderId);
        if(order==null) {
            throw new OrderException("Order not found with the id "+orderId);
        }

        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getUserOrders(Long userId) throws OrderException {
        List<Order> orders=orderRepository.findByCustomerId(userId);
        return orders;


    }

    @Override
    public List<Order> getOrdersOfRestaurant(Long restaurantId, String orderStatus) throws OrderException, RestaurantException {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        if(orderStatus!=null) {
            orders = orders.stream()
                    .filter(order->order.getOrderStatus().equals(orderStatus))
                    .collect(Collectors.toList());
        }

        return orders;
    }

    public Order findOrderById(Long orderId) throws OrderException {
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()) return order.get();

        throw new OrderException("Order not found with the id "+orderId);
    }
}
