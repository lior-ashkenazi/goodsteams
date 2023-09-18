package com.goodsteams.orderservice.controller;

import com.goodsteams.orderservice.dto.CartItemDTO;
import com.goodsteams.orderservice.exception.EmptyCartException;
import com.goodsteams.orderservice.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order/payment")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Payment Intent");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/payment-complete")
    public ResponseEntity<Map<String, String>> completePayment(@RequestHeader("Authorization") String authHeader,
                                                               @RequestBody List<CartItemDTO> cartItemsDTO) {
        if (cartItemsDTO.isEmpty()) {
            throw new EmptyCartException();
        }

        String token = authHeader.substring(7);

        orderService.saveOrderByToken(token, cartItemsDTO);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Payment completed.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
