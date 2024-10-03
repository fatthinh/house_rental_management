package com.lpthinh.paymentservice.payment;

import java.time.LocalDateTime;

public record PaymentResponse(
        Integer id,
        PaymentMethod method,
        Long amount,
        String transactionId,
        Integer invoiceId,
        LocalDateTime createdAt
) {
}
