package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.tenant.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record AgreementRequest(
        String id,
        BigDecimal deposit,
        String startDate,
        Integer houseId,
        List<Tenant> tenants
) {
}
