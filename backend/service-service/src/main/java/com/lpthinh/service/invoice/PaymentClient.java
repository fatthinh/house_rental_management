package com.lpthinh.service.invoice;

import com.lpthinh.service.config.FeignClientConfig;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(
        name = "payment-service",
        url = "${application.config.payment-url}",
        configuration = FeignClientConfig.class
)
public interface PaymentClient {

    @PutMapping("/invoice/{invoice-id}/{state}")
    void changeInvoiceState(@PathVariable("invoice-id") Long invoiceId, @PathVariable("state") String state);

    @PostMapping("/invoice/{invoice-id}/updateAmount")
    void updateInvoiceAmount(@PathVariable("invoice-id") Long invoiceId);

    @PostMapping("/invoice")
    ResponseEntity<Integer> create(@RequestBody @Valid InvoiceRequest request);

}