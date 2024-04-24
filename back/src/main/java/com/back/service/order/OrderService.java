package com.back.service.order;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.order.OrderDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface OrderService {
    PageResponseDTO<OrderDTO> getList(String userId, PageRequestDTO pageRequestDTO);
    Long register(OrderDTO orderDTO);
}
