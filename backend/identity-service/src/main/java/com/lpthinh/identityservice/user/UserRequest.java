package com.lpthinh.identityservice.user;

public record UserRequest(
        String id,
        String email,
        String password
) {
}
