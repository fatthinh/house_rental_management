package com.lpthinh.service.invoice;

public record InvoiceRequest(
        Long amount,
        Long serviceId
) {
}
