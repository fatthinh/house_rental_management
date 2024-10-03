package com.lpthinh.identityservice.user;

public record UserResponse(
        String id,
        String email,
        String state,
        String role
) {
}
