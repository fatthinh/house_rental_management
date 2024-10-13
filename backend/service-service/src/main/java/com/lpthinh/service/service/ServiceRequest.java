package com.lpthinh.service.service;

public record ServiceRequest(
        Long id,
        Integer categoryId,
        Integer agreementId,
        Integer quantity,
        boolean init
) {
}
