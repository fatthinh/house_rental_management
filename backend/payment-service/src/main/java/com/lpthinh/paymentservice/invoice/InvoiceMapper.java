package com.lpthinh.paymentservice.invoice;

import org.springframework.stereotype.Component;

@Component
public class InvoiceMapper {
    public Invoice toInvoice(InvoiceRequest request) {
        if (request == null)
            return null;

        return Invoice
                .builder()
                .amount(request.amount())
                .month(InvoiceMonth.values()[request.month() - 1])
                .agreementId(request.agreementId())
                .build();
    }


    public InvoiceResponse toInvoiceResponse(Invoice invoice) {
        return new InvoiceResponse(
                invoice.getId(),
                invoice.getAmount(),
                invoice.getMonth(),
                invoice.getState(),
                invoice.getCreatedAt(),
                invoice.getAgreementId()
        );
    }
}