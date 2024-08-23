package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.tenant.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record AgreementResponse(
        String id,
        BigDecimal deposit,
        AgreementState state,
        LocalDate startDate,
        LocalDateTime createdDate,
        Integer houseId,
        List<Tenant> tenants
) {
}
