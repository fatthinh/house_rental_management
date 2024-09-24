package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.tenant.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record AgreementRequest(
        Integer id,
        Long deposit,
        String startDate,
        Integer houseId,
        List<TenantResponse> tenants
) {
}
