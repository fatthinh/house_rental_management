package com.lpthinh.rentalservice.identity;

public record UserRequest(
        String id,
        String email,
        String password
) {
}
