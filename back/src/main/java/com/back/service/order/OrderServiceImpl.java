package com.back.service.order;

import com.back.domain.order.Order;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.order.OrderDTO;
import com.back.repository.order.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
//@Transactional
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    @Override
    public PageResponseDTO<OrderDTO> getList(String userId, PageRequestDTO pageRequestDTO) {
        log.info("getList order......");

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() <=0?
                        0: pageRequestDTO.getPage() -1,
                pageRequestDTO.getSize(),
                Sort.by("ono").descending());
        Page<Order> result = orderRepository.orderList(userId, pageable);
        List<OrderDTO> dtoList = result.getContent().stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
        return PageResponseDTO.<OrderDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .dtoList(dtoList)
                .totalCount((int)result.getTotalElements())
                .build();
    };

    @Override
    public Long register(OrderDTO orderDTO){
        Order order = Order.builder()
                .userId(orderDTO.getUserId())
                .impUid(orderDTO.getImpUid())
                .orderName(orderDTO.getOrderName())
                .totalPrice(orderDTO.getTotalPrice())
                .buyerName(orderDTO.getBuyerName())
                .buyerEmail(orderDTO.getBuyerEmail())
                .buyerAddress(orderDTO.getBuyerAddress())
                .orderStatus(orderDTO.getOrderStatus())
                .deliveryRequest(orderDTO.getDeliveryRequest())
                .build();

        Order result = orderRepository.save(order);

        return result.getOno();
    }
}
