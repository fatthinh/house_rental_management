package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.tenant.Tenant;
import com.lpthinh.rentalservice.tenant.TenantMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class AgreementMapper {

    public Agreement toAgreement(AgreementRequest request) {
        if (request == null)
            return null;

        return Agreement
                .builder()
                .deposit(request.deposit())
                .startDate(LocalDate.parse(request.startDate()))
                .createdDate(LocalDateTime.now())
                .houseId(request.houseId())
                .representer("temp")
                .build();
    }


    public AgreementResponse toAgreementDetailResponse(Agreement agreement) {
        List<TenantResponse> tenants = new ArrayList<>();

        for (Tenant tenant : agreement.getTenants()) {
            tenants.add(new TenantResponse(tenant.getId(), tenant.getName(), tenant.getPhone()));
        }

        String agreementState = "";
        switch (agreement.getState()) {
            case AgreementState.ACTIVE:
                agreementState = "Hiệu lực";
                break;
            case AgreementState.CANCEL:
                agreementState = "Hủy";
                break;
            case AgreementState.COMPLETED:
                agreementState = "Hết hạn";
                break;
            case AgreementState.PENDING:
                agreementState = "Chờ";
                break;
        }

        return new AgreementResponse(
                agreement.getId(),
                agreement.getDeposit(),
                agreementState,
                agreement.getStartDate(),
                agreement.getCreatedDate(),
                agreement.getHouseId(),
                agreement.getRepresenter(),
                tenants,
                agreement.getHouseName(),
                agreement.getHousePrice()
        );
    }

    public AgreementResponse toAgreementResponse(Agreement agreement) {
        String agreementState = "";
        switch (agreement.getState()) {
            case AgreementState.ACTIVE:
                agreementState = "Hiệu lực";
                break;
            case AgreementState.CANCEL:
                agreementState = "Hủy";
                break;
            case AgreementState.COMPLETED:
                agreementState = "Hết hạn";
                break;
            case AgreementState.PENDING:
                agreementState = "Chờ";
                break;
        }

        return new AgreementResponse(
                agreement.getId(),
                agreement.getDeposit(),
                agreementState,
                agreement.getStartDate(),
                agreement.getCreatedDate(),
                agreement.getHouseId(),
                agreement.getRepresenter(),
                null,
                agreement.getHouseName(),
                agreement.getHousePrice()
        );
    }
}
