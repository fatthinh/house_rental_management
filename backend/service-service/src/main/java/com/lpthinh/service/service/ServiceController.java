package com.lpthinh.service.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/service")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService service;

    @GetMapping
    public ResponseEntity<List<ServiceResponse>> findAll(@RequestParam Map<String, String> params) {

        return ResponseEntity.ok(this.service.findAll(params));
    }

    @GetMapping("/{service-id}")
    public ResponseEntity<ServiceResponse> findById(@PathVariable("service-id") Long id) {
        return ResponseEntity.ok(this.service.findById(id));
    }


    @PostMapping
    public ResponseEntity<Long> create(
            @RequestBody @Valid ServiceRequest request
    ) {
        return ResponseEntity.ok(this.service.create(request));
    }

    @PostMapping("/createAll")
    public ResponseEntity<Void> createMultiple(
            @RequestBody @Valid List<ServiceRequest> request
    ) {
        this.service.createMultiple(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/updateAll")
    public ResponseEntity<Void> updateAll(
            @RequestBody @Valid List<ServiceRequest> request
    ) {
        this.service.updateAll(request);
        return ResponseEntity.accepted().build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody @Valid ServiceRequest request) {
        this.service.update(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{service-id}")
    public ResponseEntity<Void> deleteById(@PathVariable("service-id") Long serviceId) {
        this.service.delete(serviceId);
        return ResponseEntity.accepted().build();
    }
}