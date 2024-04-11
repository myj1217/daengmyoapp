package com.back.repository.cart;

import java.util.Optional;

import com.back.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.back.domain.cart.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
    @Query("select cart from Cart cart where cart.owner.email = :email")
    public Optional<Cart> getCartOfMember(@Param("email") String email);

    @Query("SELECT c FROM Cart c WHERE c.owner = :owner")
    Cart findByOwner(@Param("owner") Member owner);
}