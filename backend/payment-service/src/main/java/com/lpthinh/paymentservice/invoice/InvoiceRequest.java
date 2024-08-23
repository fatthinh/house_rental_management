package com.lpthinh.paymentservice.invoice;

import java.math.BigDecimal;

public record InvoiceRequest(
        String id,
        BigDecimal amount,
        Integer month,
        String agreementId
) {
}
