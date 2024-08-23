package com.lpthinh.rentalservice.tenant;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TenantMapper {
    public Tenant toTenant(TenantRequest request) {
        if (request == null)
            return null;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dob = LocalDate.parse(request.dob(), formatter);

        return Tenant
                .builder()
                .name(request.name())
                .gender(request.gender() == 0 ? TenantGender.MALE : TenantGender.FEMALE)
                .dob(dob)
                .hometown(request.hometown())
                .citizenId(request.citizenId())
                .build();
    }


    public TenantResponse toTenantResponse(Tenant tenant) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getName(),
                tenant.getState(),
                tenant.getDob(),
                tenant.getGender(),
                tenant.getHometown(),
                tenant.getCitizenId()
        );
    }
}