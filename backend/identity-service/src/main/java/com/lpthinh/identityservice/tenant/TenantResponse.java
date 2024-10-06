package com.lpthinh.identityservice.tenant;

import java.time.LocalDate;

public record TenantResponse(
        String id,
        String name,
        LocalDate dob,
        String genderString,
        String hometown,
        String citizenId,
        String phone,
        Integer houseId
) {
}