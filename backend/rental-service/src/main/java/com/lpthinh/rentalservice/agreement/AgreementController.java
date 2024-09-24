package com.lpthinh.rentalservice.agreement;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rental/agreement")
@RequiredArgsConstructor
public class AgreementController {

    private final AgreementService service;

    @GetMapping
    public ResponseEntity<List<AgreementResponse>> findAll(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(this.service.findAll(params));
    }

    @GetMapping("/{agreement-id}")
    public ResponseEntity<AgreementResponse> findById(@PathVariable("agreement-id") Integer id) {
        return ResponseEntity.ok(this.service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Integer> create(
            @RequestBody @Valid NewAgreementRequest request
    ) {
        return ResponseEntity.ok(this.service.create(request));
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody @Valid AgreementRequest request) {
        this.service.update(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{agreement-id}")
    public ResponseEntity<Void> deleteById(@PathVariable("agreement-id") Integer agreementId) {
        this.service.delete(agreementId);
        return ResponseEntity.accepted().build();
    }
}
