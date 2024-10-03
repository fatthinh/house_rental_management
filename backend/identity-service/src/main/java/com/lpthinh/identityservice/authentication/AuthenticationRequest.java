package com.lpthinh.identityservice.authentication;

public record AuthenticationRequest(
        String email,
        String password
) {
}
