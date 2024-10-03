package com.lpthinh.paymentservice.payment;

public record IntegratedRequest(
        String name,
        String email,
        Long amount
) {
}
