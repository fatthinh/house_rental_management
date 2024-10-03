package com.lpthinh.paymentservice.payment;

public record PayResponse(
        Boolean success,
        String message
) {
}
