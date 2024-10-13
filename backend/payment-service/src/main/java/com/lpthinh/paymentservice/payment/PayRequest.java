package com.lpthinh.paymentservice.payment;

import java.util.List;

public record PayRequest(
        String paymentMethodId,
        String paymentIntentId,
        List<Integer> invoices,
        String customer
) {
}
