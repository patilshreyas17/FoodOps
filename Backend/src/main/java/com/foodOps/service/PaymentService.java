package com.foodOps.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.foodOps.model.Order;
import com.foodOps.model.PaymentResponse;
import com.foodOps.model.User;

public interface PaymentService {


    PaymentResponse createRazorpayPaymentLink(Order order) throws RazorpayException;
}