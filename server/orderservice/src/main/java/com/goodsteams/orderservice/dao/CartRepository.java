package com.goodsteams.orderservice.dao;

import com.goodsteams.orderservice.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository <Cart, Long> {
}
