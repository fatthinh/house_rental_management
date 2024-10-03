package com.lpthinh.identityservice.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/identity/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/new")
    public ResponseEntity<String> create(@RequestBody @Valid UserRequest request) {
        return ResponseEntity.ok(userService.create(request));
    }
}
