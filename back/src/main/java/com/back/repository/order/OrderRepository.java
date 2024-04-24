package com.back.repository.order;

import com.back.domain.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select o from Order o where o.userId = :userId")
    Page<Order> orderList(@Param("userId") String userId, Pageable pageable);
}
