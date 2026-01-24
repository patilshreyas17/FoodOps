package com.foodOps.payment_service.controller;

import com.foodOps.payment_service.model.OrderDto;
import com.foodOps.payment_service.model.PaymentResponse;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {
    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @PostMapping("/generateLink")
    public  PaymentResponse genreatePaymentLink(@RequestBody OrderDto order) throws RazorpayException {
        Long amount = order.getAmount() * 100;

        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount",amount);
            paymentLinkRequest.put("currency","INR");
            JSONObject customer = new JSONObject();
            customer.put("name",order.getName());
            customer.put("email",order.getEmail());
            paymentLinkRequest.put("customer",customer);
            JSONObject notify = new JSONObject();
            notify.put("email",true);
            paymentLinkRequest.put("notify",notify);
            paymentLinkRequest.put("reminder_enable",true);
            paymentLinkRequest.put("callback_url","http://localhost:3000/payment/success/"+order
                    .getId());
            paymentLinkRequest.put("callback_method","get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkUrl = payment.get("short_url");
            String paymentLinkId = payment.get("id");
            PaymentResponse res = new PaymentResponse();
            res.setPayment_url(payment.get("short_url"));
            return  res;




        } catch (RazorpayException e) {
            System.out.println("Error creating payment link: " + e.getMessage());
            throw new RazorpayException(e.getMessage());
        }



    }
}
