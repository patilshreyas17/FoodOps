package com.foodOps.service;

import com.foodOps.model.*;
import com.foodOps.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsServiceImplementation implements AnalyticsService {

        @Autowired
        private RestaurantRepository restaurantRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private OrderRepository orderRepository;

        @Override
        public Map<String, Object> getRestaurantAnalytics(Long userId) throws Exception {
                Restaurant restaurant = restaurantRepository.findByOwnerId(userId);
                if (restaurant == null) {
                        throw new Exception("Restaurant not found for user");
                }

                Map<String, Object> analytics = new HashMap<>();

                List<Order> orders = orderRepository.findOrdersByRestaurantId(restaurant.getId());

                analytics.put("totalOrders", orders.size());
                analytics.put("totalRevenue", orders.stream()
                                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                                .sum());

                Map<String, Long> orderStatusCount = orders.stream()
                                .collect(Collectors.groupingBy(
                                                order -> order.getOrderStatus(),
                                                Collectors.counting()));
                analytics.put("orderStatusBreakdown", orderStatusCount);

                Map<String, Double> dailyRevenue = new LinkedHashMap<>();
                LocalDate now = LocalDate.now();

                for (int i = 6; i >= 0; i--) {
                        LocalDate date = now.minusDays(i);
                        String dateStr = date.toString();
                        double revenue = orders.stream()
                                        .filter(order -> {
                                                if (order.getCreatedAt() == null)
                                                        return false;
                                                LocalDate orderDate = order.getCreatedAt().toInstant()
                                                                .atZone(ZoneId.systemDefault())
                                                                .toLocalDate();
                                                return orderDate.equals(date);
                                        })
                                        .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount()
                                                        : 0.0)
                                        .sum();
                        dailyRevenue.put(dateStr, revenue);
                }
                analytics.put("dailyRevenue", dailyRevenue);

                Set<User> uniqueCustomers = orders.stream()
                                .map(Order::getCustomer)
                                .filter(Objects::nonNull)
                                .collect(Collectors.toSet());

                analytics.put("totalCustomers", uniqueCustomers.size());

                return analytics;
        }

        @Override
        public Map<String, Object> getSuperAdminAnalytics() throws Exception {
                Map<String, Object> analytics = new HashMap<>();

                List<User> allUsers = userRepository.findAll();
                List<Restaurant> allRestaurants = restaurantRepository.findAll();
                List<Order> allOrders = orderRepository.findAll();

                Map<String, Long> userRoleCount = allUsers.stream()
                                .collect(Collectors.groupingBy(
                                                user -> user.getRole().toString(),
                                                Collectors.counting()));
                analytics.put("userRoleBreakdown", userRoleCount);

                analytics.put("totalRestaurants", allRestaurants.size());

                Map<String, Long> restaurantStatusCount = allRestaurants.stream()
                                .collect(Collectors.groupingBy(
                                                restaurant -> restaurant.getApprovalStatus(),
                                                Collectors.counting()));
                analytics.put("restaurantStatusBreakdown", restaurantStatusCount);

                analytics.put("totalOrders", allOrders.size());
                analytics.put("totalRevenue", allOrders.stream()
                                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                                .sum());

                Map<String, Double> restaurantRevenue = new HashMap<>();
                for (Restaurant restaurant : allRestaurants) {
                        List<Order> restaurantOrders = orderRepository.findOrdersByRestaurantId(restaurant.getId());
                        double revenue = restaurantOrders.stream()
                                        .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount()
                                                        : 0.0)
                                        .sum();
                        restaurantRevenue.put(restaurant.getName(), revenue);
                }

                Map<String, Double> topRestaurants = restaurantRevenue.entrySet().stream()
                                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                                .limit(10)
                                .collect(Collectors.toMap(
                                                Map.Entry::getKey,
                                                Map.Entry::getValue,
                                                (e1, e2) -> e1,
                                                LinkedHashMap::new));
                analytics.put("topRestaurants", topRestaurants);

                analytics.put("dailyRegistrations", new HashMap<>());

                return analytics;
        }

        @Override
        public Map<String, Object> getCustomerAnalytics(Long userId) throws Exception {
                Map<String, Object> analytics = new HashMap<>();

                List<Order> customerOrders = orderRepository.findAllUserOrders(userId);

                analytics.put("totalOrders", customerOrders.size());
                analytics.put("totalSpent", customerOrders.stream()
                                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                                .sum());

                double avgOrderValue = customerOrders.isEmpty() ? 0.0
                                : customerOrders.stream()
                                                .mapToDouble(order -> order.getTotalAmount() != null
                                                                ? order.getTotalAmount()
                                                                : 0.0)
                                                .average()
                                                .orElse(0.0);
                analytics.put("averageOrderValue", avgOrderValue);

                Map<String, Long> restaurantOrderCount = customerOrders.stream()
                                .filter(order -> order.getRestaurant() != null)
                                .collect(Collectors.groupingBy(
                                                order -> order.getRestaurant().getName(),
                                                Collectors.counting()));

                Map<String, Long> favoriteRestaurants = restaurantOrderCount.entrySet().stream()
                                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                                .limit(5)
                                .collect(Collectors.toMap(
                                                Map.Entry::getKey,
                                                Map.Entry::getValue,
                                                (e1, e2) -> e1,
                                                LinkedHashMap::new));
                analytics.put("favoriteRestaurants", favoriteRestaurants);

                Map<String, Long> orderStatusCount = customerOrders.stream()
                                .collect(Collectors.groupingBy(
                                                order -> order.getOrderStatus(),
                                                Collectors.counting()));
                analytics.put("orderStatusBreakdown", orderStatusCount);

                Map<String, Double> monthlySpending = new LinkedHashMap<>();
                LocalDate now = LocalDate.now();

                for (int i = 5; i >= 0; i--) {
                        LocalDate month = now.minusMonths(i);
                        String monthStr = month.toString().substring(0, 7);
                        final int finalYear = month.getYear();
                        final int finalMonth = month.getMonthValue();

                        double spending = customerOrders.stream()
                                        .filter(order -> {
                                                if (order.getCreatedAt() == null)
                                                        return false;
                                                LocalDate orderDate = order.getCreatedAt().toInstant()
                                                                .atZone(ZoneId.systemDefault())
                                                                .toLocalDate();
                                                return orderDate.getYear() == finalYear &&
                                                                orderDate.getMonthValue() == finalMonth;
                                        })
                                        .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount()
                                                        : 0.0)
                                        .sum();
                        monthlySpending.put(monthStr, spending);
                }
                analytics.put("monthlySpending", monthlySpending);

                return analytics;
        }

        @Override
        public Map<String, Object> getRestaurantAnalyticsById(Long restaurantId) throws Exception {
                Restaurant restaurant = restaurantRepository.findById(restaurantId)
                                .orElseThrow(() -> new Exception("Restaurant not found"));

                Map<String, Object> analytics = new HashMap<>();

                analytics.put("restaurantName", restaurant.getName());
                analytics.put("cuisineType", restaurant.getCuisineType());
                analytics.put("approvalStatus", restaurant.getApprovalStatus());

                List<Order> orders = orderRepository.findOrdersByRestaurantId(restaurantId);
                analytics.put("totalOrders", orders.size());
                analytics.put("totalRevenue", orders.stream()
                                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                                .sum());

                Map<String, Long> orderStatusCount = orders.stream()
                                .collect(Collectors.groupingBy(
                                                order -> order.getOrderStatus(),
                                                Collectors.counting()));
                analytics.put("orderStatusBreakdown", orderStatusCount);

                Set<User> uniqueCustomers = orders.stream()
                                .map(Order::getCustomer)
                                .filter(Objects::nonNull)
                                .collect(Collectors.toSet());
                analytics.put("totalCustomers", uniqueCustomers.size());

                return analytics;
        }
}
