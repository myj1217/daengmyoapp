package com.back.domain.order;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orders")
@Getter
@ToString // (exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ono;
    private String userId;
    private String impUid;
    private String orderName;
    private int totalPrice;
    private String buyerName;
    private String buyerTel;
    private String buyerEmail;
    private String buyerAddress;
    private String orderStatus;
    private String deliveryRequest;
}
