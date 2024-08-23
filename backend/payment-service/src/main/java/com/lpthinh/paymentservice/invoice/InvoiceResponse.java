package com.lpthinh.paymentservice.invoice;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record InvoiceResponse(
        String id,
        BigDecimal amount,
        InvoiceMonth month,
        InvoiceState state,
        LocalDateTime createdAt,
        String agreementId
) {
}
