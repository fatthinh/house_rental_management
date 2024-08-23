package com.lpthinh.rentalservice.agreement;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/agreement")
@RequiredArgsConstructor
public class AgreementController {

    private final AgreementService service;

    @GetMapping
    public ResponseEntity<List<AgreementResponse>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{agreement-id}")
    public ResponseEntity<AgreementResponse> findById(@PathVariable("agreement-id") String id) {
        return ResponseEntity.ok(this.service.findById(id));
    }

    @PostMapping
    public ResponseEntity<String> create(
            @RequestBody @Valid AgreementRequest request
    ) {
        return ResponseEntity.ok(this.service.create(request));
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody @Valid AgreementRequest request) {
        this.service.update(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{agreement-id}")
    public ResponseEntity<Void> deleteById(@PathVariable("agreement-id") String agreementId) {
        this.service.delete(agreementId);
        return ResponseEntity.accepted().build();
    }
}
