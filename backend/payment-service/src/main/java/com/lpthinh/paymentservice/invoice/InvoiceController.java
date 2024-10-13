package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.invoice.InvoiceRequest;
import com.lpthinh.paymentservice.invoice.InvoiceResponse;
import com.lpthinh.paymentservice.invoice.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService service;
    private final InvoiceMapper mapper;

    @GetMapping
    public ResponseEntity<List<InvoiceResponse>> findAll(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(this.service.findAll(params));
    }

    @GetMapping("/getByServices")
    public ResponseEntity<List<InvoiceResponse>> findByServices(@RequestParam("services") List<Long> serviceIds) {
        return ResponseEntity.ok(this.service.findByServices(serviceIds));
    }

    @GetMapping("/{invoice-id}")
    public ResponseEntity<InvoiceResponse> findById(@PathVariable("invoice-id") Integer id) {
        return ResponseEntity.ok(this.mapper.toInvoiceResponse(this.service.findById(id)));
    }

    @PutMapping("/{invoice-id}/{state}")
    public ResponseEntity<Void> changeState(@PathVariable("invoice-id") Integer id, @PathVariable("state") String state) {
        this.service.changeState(id, state);
        return ResponseEntity.accepted().build();
    }

    @PostMapping
    public ResponseEntity<Integer> create(
            @RequestBody @Valid InvoiceRequest request
    ) {
        return ResponseEntity.ok(this.service.create(request));
    }

    @PostMapping("/createAll")
    public ResponseEntity<Void> createAll() {
        this.service.createByAgreements();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{invoice-id}/updateAmount")
    public ResponseEntity<Void> updateAmount(
            @PathVariable("invoice-id") Integer id
    ) {
        this.service.updateAmount(id);
        return ResponseEntity.accepted().build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody @Valid InvoiceRequest request) {
        this.service.update(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{invoice-id}")
    public ResponseEntity<Void> deleteById(@PathVariable("invoice-id") Integer invoiceId) {
        this.service.delete(invoiceId);
        return ResponseEntity.accepted().build();
    }
}