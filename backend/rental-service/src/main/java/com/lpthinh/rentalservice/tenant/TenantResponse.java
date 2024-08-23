package com.lpthinh.rentalservice.tenant;

import java.time.LocalDate;

public record TenantResponse(
        String id,
        String name,
        TenantState state,
        LocalDate dob,
        TenantGender gender,
        String hometown,
        String citizenId
) {
}