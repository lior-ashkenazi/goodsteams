package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.dao.OrderRepository;
import com.goodsteams.orderservice.dto.BookDTO;
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
    private final RedisService redisService;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        TokenService tokenService,
                        CartService cartService,
                        KafkaService kafkaService,
                        RedisService redisService) {
        this.orderRepository = orderRepository;
        this.tokenService = tokenService;
        this.cartService = cartService;
        this.kafkaService = kafkaService;
        this.redisService = redisService;
    }

    public void saveOrderByToken(String token, List<CartItemDTO> cartItemsDTO) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        // Initialize total price
        BigDecimal totalPrice = BigDecimal.ZERO;

        Order order = new Order(userId, BigDecimal.ZERO);  // Initialize with zero and update later
        List<OrderItemDTO> orderItemsDTO = new ArrayList<>();

        for (CartItemDTO cartItemDTO : cartItemsDTO) {
            BookDTO bookData = redisService.getBook(cartItemDTO.bookId().toString());

            BigDecimal price = bookData.getPrice();

            totalPrice = totalPrice.add(price);

            OrderItem orderItem = new OrderItem(order, cartItemDTO.bookId(), price);
            orderItemsDTO.add(new OrderItemDTO(userId, cartItemDTO.bookId()));

            order.getOrderItems().add(orderItem);
        }

        // Update the total price in the order
        order.setTotalPrice(totalPrice);

        // Save order
        orderRepository.save(order);

        // Empty cart
        cartService.clearCartByUserId(userId);

        // Produce order payment event
        kafkaService.produceOrderPaymentEvent(orderItemsDTO);
    }
}
