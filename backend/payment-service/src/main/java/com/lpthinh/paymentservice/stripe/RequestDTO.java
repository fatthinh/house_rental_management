package com.lpthinh.paymentservice.stripe;

import java.math.BigDecimal;

public record RequestDTO(
        String name,
        String email,
        Long amount
) {
}
