package com.lpthinh.service.service;

import com.lpthinh.service.category.Category;

import java.time.LocalDateTime;

public record ServiceResponse(
        Long id,
        Category category,
        Integer agreementId,
        ServiceState state,
        Integer quantity,
        LocalDateTime createdAt,
        Integer prevQuantity
) {
}
