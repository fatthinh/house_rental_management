package com.lpthinh.paymentservice.payment;

public record PayRequest(
        String paymentMethodId,
        String paymentIntentId,
        Integer invoiceId
) {
}
