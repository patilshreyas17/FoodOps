package com.foodOps.service;

import com.foodOps.config.WebClientConfig;
import com.foodOps.request.PaymentReq;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.foodOps.model.Order;
import com.foodOps.model.PaymentResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class PaymentServiceImplementation implements PaymentService{

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;


    @Override
    public PaymentResponse createRazorpayPaymentLink(Order order) throws RazorpayException {

        PaymentReq request = new PaymentReq();
        request.setAmount(order.getTotalAmount());
        request.setName(order.getCustomer().getFullName());
        request.setEmail(order.getCustomer().getEmail());
        request.setId(order.getId());

        try{
            PaymentResponse res = webClientBuilder.build()
                    .post()
                    .uri("http://PAYMENT-SERVICE/generateLink")

                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(PaymentResponse.class)
                    .block();
            return res;

        } catch (Exception e) {

            System.err.println("CRITICAL ERROR calling Payment Service: " + e.getMessage());
            throw new RuntimeException(e);
        }



    }


}
