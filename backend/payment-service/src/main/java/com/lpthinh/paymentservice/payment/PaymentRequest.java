package com.lpthinh.paymentservice.payment;

public record PaymentRequest(
        Long amount,
        String method,
        String transactionId,
        Integer invoiceId
) {
}
