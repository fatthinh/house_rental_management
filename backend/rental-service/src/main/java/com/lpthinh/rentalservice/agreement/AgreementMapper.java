package com.lpthinh.rentalservice.agreement;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AgreementMapper {
    public Agreement toAgreement(AgreementRequest request) {
        if (request == null)
            return null;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate date = LocalDate.parse(request.startDate(), formatter);

        return Agreement
                .builder()
                .deposit(request.deposit())
                .startDate(date)
                .createdDate(LocalDateTime.now())
                .houseId(request.houseId())
                .build();
    }


    public AgreementResponse toAgreementResponse(Agreement agreement) {
        return new AgreementResponse(
                agreement.getId(),
                agreement.getDeposit(),
                agreement.getState(),
                agreement.getStartDate(),
                agreement.getCreatedDate(),
                agreement.getHouseId(),
                agreement.getTenants()
        );
    }
}
