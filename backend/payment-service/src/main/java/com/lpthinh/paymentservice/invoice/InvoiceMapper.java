package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.rental.HouseResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class InvoiceMapper {
    public Invoice toInvoice(InvoiceRequest request) {
        if (request == null)
            return null;

        return Invoice
                .builder()
                .amount(request.amount())
                .serviceId(request.serviceId())
                .createdAt(LocalDateTime.now())
                .build();
    }


    public InvoiceResponse toInvoiceResponse(Invoice invoice) {
        return new InvoiceResponse(
                invoice.getId(),
                invoice.getAmount(),
                invoice.getState(),
                invoice.getCreatedAt(),
                invoice.getServiceId()
        );
    }
}