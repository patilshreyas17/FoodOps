package com.foodOps.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.foodOps.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	@Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))")
	List<Restaurant> findBySearchQuery(String query);

	@Query("SELECT r FROM Restaurant r WHERE (lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))) AND r.approvalStatus = :status")
	List<Restaurant> findBySearchQueryAndApprovalStatus(String query, String status);

	Restaurant findByOwnerId(Long userId);

	List<Restaurant> findByApprovalStatus(String approvalStatus);

}
