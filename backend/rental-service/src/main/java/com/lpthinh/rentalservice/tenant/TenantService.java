package com.lpthinh.rentalservice.tenant;

import com.lpthinh.rentalservice.exception.TenantNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantService {
    private final TenantRepository repository;
    private final TenantMapper mapper;

    public String create(TenantRequest request) {
        var tenant = mapper.toTenant(request);

        tenant.setState(TenantState.GOOD);
        return this.repository.save(tenant).getId();
    }

    public List<TenantResponse> findAll() {
        return this.repository
                .findAll()
                .stream()
                .map(mapper::toTenantResponse)
                .collect(Collectors.toList());
    }

    public TenantResponse findById(String id) {
        return this.repository
                .findById(id)
                .stream()
                .map(mapper::toTenantResponse)
                .findFirst()
                .orElseThrow(() -> new TenantNotFoundException("Tenant not found with ID:: " + id));
    }

    public void update(TenantRequest request) {
        var tenant = this.repository
                .findById(request.id())
                .orElseThrow(() -> new TenantNotFoundException(String.format("Cannot update tenant:: No tenant found with the provided ID: %s", request.id())));
        mergeTenant(tenant, request);
        this.repository.save(tenant);
    }

    public void delete(String id) {
        this.repository.deleteById(id);
    }

    private void mergeTenant(Tenant tenant, TenantRequest request) {
        if (StringUtils.isNotBlank(request.name())) {
            tenant.setName(request.name());
        }
        if (StringUtils.isNotBlank(request.dob())) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            LocalDate dob = LocalDate.parse(request.dob(), formatter);

            tenant.setDob(dob);
        }
        if (request.gender() != null) {
            tenant.setGender(request.gender() == 0 ? TenantGender.MALE : TenantGender.FEMALE);
        }
        if (StringUtils.isNotBlank(request.hometown())) {
            tenant.setHometown(request.hometown());
        }
        if (StringUtils.isNotBlank(request.citizenId())) {
            tenant.setCitizenId(request.citizenId());
        }

    }
}