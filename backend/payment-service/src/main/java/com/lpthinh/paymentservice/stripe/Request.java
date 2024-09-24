package com.lpthinh.paymentservice.stripe;

public record Request(
        String paymentMethodId,
        String paymentIntentId,
        String customerId
) {
}
