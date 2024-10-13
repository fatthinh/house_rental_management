package com.lpthinh.identityservice.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<TenantUserResponse>> findUsers(@RequestParam("name") String name) {
        return ResponseEntity.ok(userService.findUsers(name));
    }

    @GetMapping("/current-user")
    public TenantUserResponse getUser(Authentication authentication) {
        if (authentication.isAuthenticated())
            return this.userService.findTenantByEmail(authentication.getName());
        else
            return null;
    }
}
