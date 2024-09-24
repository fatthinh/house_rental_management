package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.service.ServiceResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record InvoiceResponse(
        Integer id,
        Long amount,
        Integer month,
        InvoiceState state,
        LocalDateTime createdAt,
        Integer agreementId,
        String houseName,
        Long housePrice,
        List<ServiceResponse> services
) {
}
