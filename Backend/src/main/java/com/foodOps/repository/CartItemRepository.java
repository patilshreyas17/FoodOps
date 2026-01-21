package com.foodOps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodOps.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


//    CartItem findByFoodIsContaining

}
