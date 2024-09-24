package com.lpthinh.paymentservice.stripe;

public record PayResponse(
        Boolean success,
        String message
) {
}
