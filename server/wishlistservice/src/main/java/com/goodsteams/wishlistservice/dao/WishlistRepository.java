package com.goodsteams.wishlistservice.dao;

import com.goodsteams.wishlistservice.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Optional<Wishlist> findWishlistByUserId(Long userId);
}
