package com.back.controller.order;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.order.OrderDTO;
import com.back.dto.product.ProductReplyDTO;
import com.back.service.order.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;
    @GetMapping(value = "/list/{userId}")
    public PageResponseDTO<OrderDTO> getList(@PathVariable("userId") String userId,
                                             PageRequestDTO pageRequestDTO){
        PageResponseDTO<OrderDTO> responseDTO =
                orderService.getList(userId, pageRequestDTO);

        return responseDTO;
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> register(@Valid @RequestBody OrderDTO orderDTO) {
        log.info(orderDTO);

        Map<String, Long> resultMap = new HashMap<>();
        Long ono = orderService.register(orderDTO);
        resultMap.put("ono", ono);

        return resultMap;
    }
}
