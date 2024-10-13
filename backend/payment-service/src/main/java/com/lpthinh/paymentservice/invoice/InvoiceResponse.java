package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.service.ServiceResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record InvoiceResponse(
        Integer id,
        Long amount,
        InvoiceState state,
        LocalDateTime createdAt,
        Long serviceId
) {
}
