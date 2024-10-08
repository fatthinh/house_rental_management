package com.lpthinh.rentalservice.tenant;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rental/tenant")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class TenantController {

    private final TenantService service;

    @GetMapping
    public ResponseEntity<List<TenantResponse>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{tenant-id}")
    public ResponseEntity<TenantResponse> findById(@PathVariable("tenant-id") String id) {
        return ResponseEntity.ok(this.service.findById(id));
    }

    @PostMapping
    public ResponseEntity<String> create(
            @RequestBody @Valid TenantRequest request
    ) {
        return ResponseEntity.ok(this.service.create(request));
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody @Valid TenantRequest request) {
        this.service.update(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{tenant-id}")
    public ResponseEntity<Void> deleteById(@PathVariable("tenant-id") String tenantId) {
        this.service.delete(tenantId);
        return ResponseEntity.accepted().build();
    }
}
