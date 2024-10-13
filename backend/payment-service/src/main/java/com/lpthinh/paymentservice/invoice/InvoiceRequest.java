package com.lpthinh.paymentservice.invoice;

public record InvoiceRequest(
        Integer id,
        Long amount,
        Long serviceId
) {
}
