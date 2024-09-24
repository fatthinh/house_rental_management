package com.lpthinh.rentalservice.tenant;

import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class TenantMapper {
    public Tenant toTenant(TenantRequest request) {
        if (request == null)
            return null;

        return Tenant
                .builder()
                .name(request.name())
                .gender(request.gender() == 0 ? TenantGender.MALE : TenantGender.FEMALE)
                .dob(LocalDate.parse(request.dob()))
                .hometown(request.hometown())
                .citizenId(request.citizenId())
                .phone(request.phone())
                .build();
    }


    public TenantResponse toTenantResponse(Tenant tenant) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getName(),
                tenant.getState(),
                tenant.getDob(),
                tenant.getGender() == TenantGender.MALE ? "Nam" : "Nữ",
                tenant.getHometown(),
                tenant.getCitizenId(),
                tenant.getPhone(),
                tenant.getAgreement().getHouseId()
        );
    }
}