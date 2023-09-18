package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.dao.OrderRepository;
import com.goodsteams.orderservice.dto.CartItemDTO;
import com.goodsteams.orderservice.dto.OrderItemDTO;
import com.goodsteams.orderservice.entity.Order;
import com.goodsteams.orderservice.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final TokenService tokenService;
    private final CartService cartService;
    private final KafkaService kafkaService;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        TokenService tokenService,
                        CartService cartService,
                        KafkaService kafkaService) {
        this.orderRepository = orderRepository;
        this.tokenService = tokenService;
        this.cartService = cartService;
        this.kafkaService = kafkaService;
    }

    public void saveOrderByToken(String token, List<CartItemDTO> cartItemsDTO) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        BigDecimal totalPrice = cartItemsDTO.stream()
                .map(CartItemDTO::price)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order(userId, totalPrice);
        List<OrderItemDTO> orderItemsDTO = new ArrayList<>();

        for (CartItemDTO cartItemDTO : cartItemsDTO) {
            OrderItem orderItem = new OrderItem(order, cartItemDTO.bookId(), cartItemDTO.price());
            orderItemsDTO.add(new OrderItemDTO(userId, cartItemDTO.bookId(), cartItemDTO.title(), cartItemDTO.author(), cartItemDTO.coverImageUrl()));

            order.getOrderItems().add(orderItem);
        }

        // Save order
        orderRepository.save(order);

        // Empty cart
        cartService.clearCartByUserId(userId);

        // Produce order payment event
        kafkaService.produceOrderPaymentEvent(orderItemsDTO);
    }
}
