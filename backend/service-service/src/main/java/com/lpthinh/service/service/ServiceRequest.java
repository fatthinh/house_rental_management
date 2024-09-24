package com.lpthinh.service.service;

public record ServiceRequest(
        Long id,
        Integer categoryId,
        Long invoiceId,
        Integer quantity
) {
}
