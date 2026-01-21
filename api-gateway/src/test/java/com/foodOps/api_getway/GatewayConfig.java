package com.foodOps.api_getway;


import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routingLocator(RouteLocatorBuilder builder) {
        return builder.routes()
               .route("foodops-backend", r -> r
                .path("/auth/**", "/api/**", "/actuator/**", "/swagger-ui/**", "/v3/api-docs/**")
                .uri("lb://FOODOPS-BACKEND"))

                .build();


    }
}
