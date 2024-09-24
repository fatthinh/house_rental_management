package com.lpthinh.paymentservice.rental;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record AgreementResponse(
        Integer id,
        Long deposit,
        String state,
        LocalDate startDate,
        LocalDateTime createdDate,
        Integer houseId,
        String representer,
        String houseName,
        Long housePrice
) {
}
