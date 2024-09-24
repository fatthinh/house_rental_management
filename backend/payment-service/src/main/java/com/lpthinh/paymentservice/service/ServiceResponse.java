package com.lpthinh.paymentservice.service;


import java.time.LocalDateTime;

public record ServiceResponse(
        Long id,
        CategoryResponse category,
        Integer invoiceId,
        String state,
        Integer quantity,
        LocalDateTime createdAt
) {
}
