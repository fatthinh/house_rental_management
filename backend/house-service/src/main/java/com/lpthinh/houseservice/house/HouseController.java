package com.lpthinh.houseservice.house;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/house")
@RequiredArgsConstructor
public class HouseController {
    private final HouseService service;

    @PostMapping
    public ResponseEntity<Integer> create(
            @RequestBody @Valid HouseRequest request
    ) {
        return ResponseEntity.ok(this.service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<HouseResponse>> findALl() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{house-id}")
    public ResponseEntity<HouseResponse> findById(@PathVariable("house-id") Integer houseId) {
        return ResponseEntity.ok(this.service.findById(houseId));
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody @Valid HouseRequest request) {
        this.service.update(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{house-id}")
    public ResponseEntity<Void> deleteById(@PathVariable("house-id") Integer houseId) {
        this.service.delete(houseId);
        return ResponseEntity.accepted().build();
    }
}
