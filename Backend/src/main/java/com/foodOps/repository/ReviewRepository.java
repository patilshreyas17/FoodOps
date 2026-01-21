package com.foodOps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodOps.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
