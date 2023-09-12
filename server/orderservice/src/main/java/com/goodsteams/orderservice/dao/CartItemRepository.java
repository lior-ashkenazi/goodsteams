package com.goodsteams.orderservice.dao;

import com.goodsteams.orderservice.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    void deleteByCartItemId(Long cartItemId);
}
