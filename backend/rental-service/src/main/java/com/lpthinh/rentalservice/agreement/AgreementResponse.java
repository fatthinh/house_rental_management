package com.lpthinh.rentalservice.agreement;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record AgreementResponse(
        Integer id,
        Long deposit,
        String state,
        LocalDate startDate,
        LocalDateTime createdDate,
        Integer houseId,
        String representer,
        List<TenantResponse> tenants,
        String houseName,
        Long housePrice
) {
}
