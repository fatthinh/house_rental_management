package com.lpthinh.rentalservice.tenant;

import com.lpthinh.rentalservice.agreement.Agreement;

import java.time.LocalDate;

public record TenantResponse(
        String id,
        String name,
        TenantState state,
        LocalDate dob,
        String genderString,
        String hometown,
        String citizenId,
        String phone,
        Integer houseId
) {
}