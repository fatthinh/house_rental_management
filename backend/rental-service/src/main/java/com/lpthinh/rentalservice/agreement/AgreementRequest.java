package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.tenant.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record AgreementRequest(
        BigDecimal deposit,
        LocalDate startDate,
        Integer houseId,
        List<Tenant> tenants
) {
}
