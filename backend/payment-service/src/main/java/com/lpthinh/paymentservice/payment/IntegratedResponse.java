package com.lpthinh.paymentservice.payment;

public record IntegratedResponse(
        String intentClientSecret,
        String intentId,
        String customer,
        String paymentMethodId
) {
}
