package com.foodOps.service;

import java.util.List;

import com.foodOps.Exception.ReviewException;
import com.foodOps.model.Review;
import com.foodOps.model.User;
import com.foodOps.request.ReviewRequest;

public interface ReviewSerive {
	
    public Review submitReview(ReviewRequest review,User user);
    public void deleteReview(Long reviewId) throws ReviewException;
    public double calculateAverageRating(List<Review> reviews);
}
