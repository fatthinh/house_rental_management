package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.invoice.InvoiceRequest;
import com.lpthinh.paymentservice.invoice.InvoiceResponse;
import com.lpthinh.paymentservice.invoice.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payment/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService service;

    @GetMapping
    public ResponseEntity<List<InvoiceResponse>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{invoice-id}")
    public ResponseEntity<InvoiceResponse> findById(@PathVariable("invoice-id") String id) {
        return ResponseEntity.ok(this.service.findById(id));
    }

    @PostMapping
    public ResponseEntity<String> create(
            @RequestBody @Valid InvoiceRequest request
    ) {
        return ResponseEntity.ok(this.service.create(request));
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody @Valid InvoiceRequest request) {
        this.service.update(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{invoice-id}")
    public ResponseEntity<Void> deleteById(@PathVariable("invoice-id") String invoiceId) {
        this.service.delete(invoiceId);
        return ResponseEntity.accepted().build();
    }
}