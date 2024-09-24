package com.lpthinh.service.invoice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "payment-service",
        url = "${application.config.payment-url}"
)
public interface PaymentClient {

    @PutMapping("/invoice/{invoice-id}/{state}")
    void changeInvoiceState(@PathVariable("invoice-id") Long invoiceId, @PathVariable("state") String state);

    @PostMapping("/invoice/{invoice-id}/updateAmount")
    void updateInvoiceAmount(@PathVariable("invoice-id") Long invoiceId);
}