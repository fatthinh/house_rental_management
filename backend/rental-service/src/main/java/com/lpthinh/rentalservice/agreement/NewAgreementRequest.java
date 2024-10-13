package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.tenant.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record NewAgreementRequest(
        String name,
        String dob,
        String citizenId,
        String phone,
        Integer gender,
        String hometown,
        Long deposit,
        String startDate,
        Integer houseId,
        String email
) {
}
