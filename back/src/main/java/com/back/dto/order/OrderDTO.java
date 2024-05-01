package com.back.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Long ono;
    private String userId;
    private String impUid;
    private String orderName;
    private int totalPrice;
    private String buyerName;
    private String buyerTel;
    private String buyerEmail;
    private String buyerAddress;
    private String buyerDetailAddress;
    private String buyerAddressCode;
    private String orderStatus;
    private String deliveryRequest;
}
