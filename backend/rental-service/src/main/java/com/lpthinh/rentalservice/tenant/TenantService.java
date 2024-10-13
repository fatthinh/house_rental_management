package com.lpthinh.rentalservice.tenant;

import com.lpthinh.rentalservice.agreement.AgreementRepository;
import com.lpthinh.rentalservice.agreement.AgreementService;
import com.lpthinh.rentalservice.exception.TenantNotFoundException;
import com.lpthinh.rentalservice.identity.IdentityClient;
import com.lpthinh.rentalservice.identity.UserRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantService {
    private final TenantRepository repository;
    private final TenantMapper mapper;
    private final AgreementRepository agreementRepository;
    private final IdentityClient identityClient;


    @Transactional
    public String create(TenantRequest request) {
        var tenant = mapper.toTenant(request);
        tenant.setState(TenantState.GOOD);
        tenant.setAgreement(agreementRepository.findByHouseId(request.houseId()));
        var tenantId = repository.save(tenant).getId();

        identityClient.createUser(new UserRequest(
                tenantId,
                request.email(),
                "password"
        ));

        return tenantId;
    }

    public List<TenantResponse> findAll(Map<String, String> params) {
        List<Tenant> tenants = new ArrayList<>();
        if (params.containsKey("name")) {
            tenants = this.repository.findByName(params.get("name"));
        } else if (params.isEmpty()) {
            tenants = this.repository.findAll();
        }

        return tenants
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
            tenant.setDob(LocalDate.parse(request.dob()));
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
        if (StringUtils.isNotBlank(request.phone())) {
            tenant.setPhone(request.phone());
        }
    }
}