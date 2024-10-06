package com.lpthinh.identityservice.user;

import com.lpthinh.identityservice.tenant.TenantResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/identity/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/new")
    public ResponseEntity<String> create(@RequestBody @Valid UserRequest request) {
        System.out.println(request);
        return ResponseEntity.ok(userService.create(request));
    }

    @GetMapping("/{tenant-id}")
    public ResponseEntity<TenantUserResponse> findTenant(@PathVariable("tenant-id") String tenantId) {
        return ResponseEntity.ok(userService.findTenant(tenantId));
    }
}
