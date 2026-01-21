package com.foodOps.service;

import com.foodOps.model.Order;
import com.foodOps.model.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
