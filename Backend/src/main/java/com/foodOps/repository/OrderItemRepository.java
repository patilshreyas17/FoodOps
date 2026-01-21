package com.foodOps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodOps.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
