package com.lpthinh.paymentservice.invoice;

import java.math.BigDecimal;

public record InvoiceRequest(
        Integer id,
        Long amount,
        Integer month,
        Integer agreementId
) {
}
