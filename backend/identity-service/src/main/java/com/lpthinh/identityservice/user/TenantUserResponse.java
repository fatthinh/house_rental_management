package com.lpthinh.identityservice.user;

import java.time.LocalDate;

public record TenantUserResponse(
        String id,
        String email,
        String name,
        LocalDate dob,
        String genderString,
        String hometown,
        String citizenId,
        String phone,
        Integer houseId,
        Integer agreementId
) {
}
