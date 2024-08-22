package com.lpthinh.rentalservice.tenant;

import java.time.LocalDate;

public record TenantResponse(
        String id,
        String name,
        String state,
        LocalDate dob,
        String gender,
        String hometown,
        String citizenId
) {
}