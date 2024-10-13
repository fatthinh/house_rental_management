package com.lpthinh.rentalservice.tenant;

public record TenantRequest(
        String id,
        String name,
        String dob,
        Integer gender,
        String hometown,
        String citizenId,
        String phone,
        Integer houseId,
        String email
) {
}
