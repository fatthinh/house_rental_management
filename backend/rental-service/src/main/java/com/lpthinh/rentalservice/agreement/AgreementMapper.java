package com.lpthinh.rentalservice.agreement;

import org.springframework.stereotype.Component;

@Component
public class AgreementMapper {
    public Agreement toAgreement(AgreementRequest request) {
        if (request == null)
            return null;

        return Agreement
                .builder()
                .deposit(request.deposit())
                .startDate(request.startDate())
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
