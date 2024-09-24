package com.lpthinh.paymentservice.stripe;

import com.stripe.model.Customer;

public record Response(
        String intentClientSecret,
        String intentId,
        String customer,
        String paymentMethodId
) {
}
