package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.exception.AgreementNotFoundException;
import com.lpthinh.rentalservice.exception.TenantNotFoundException;
import com.lpthinh.rentalservice.house.HouseClient;
import com.lpthinh.rentalservice.house.HouseClientService;
import com.lpthinh.rentalservice.tenant.Tenant;
import com.lpthinh.rentalservice.tenant.TenantRepository;
import com.lpthinh.rentalservice.tenant.TenantRequest;
import com.lpthinh.rentalservice.tenant.TenantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgreementService {
    private final AgreementRepository repository;
    private final AgreementMapper mapper;
    private final TenantService tenantService;
    private final TenantRepository tenantRepository;
    private final HouseClient houseClient;
    private final HouseClientService houseClientService;

    public Integer create(NewAgreementRequest request) {
        var agreement = mapper.toAgreement(new AgreementRequest(null, request.deposit(), request.startDate(), request.houseId(), null));
        LocalDate date = LocalDate.parse(request.startDate());
        agreement.setState(date.compareTo(LocalDate.now()) == 0 ? AgreementState.ACTIVE : AgreementState.PENDING);

        Agreement savedAgreement = repository.save(agreement);

        String tenantId = tenantService.create(new TenantRequest(
                null,
                request.name(),
                request.dob(),
                request.gender(),
                request.hometown(),
                request.citizenId(),
                request.phone(),
                request.houseId()));

        savedAgreement.setRepresenter(tenantId);
        return this.repository.save(savedAgreement).getId();
    }

    public List<AgreementResponse> findAll(Map<String, String> params) {
        if (params.get("state") != null) {
            return this.repository
                    .findByState(AgreementState.valueOf(params.get("state").toUpperCase()))
                    .stream()
                    .map(mapper::toAgreementResponse)
                    .collect(Collectors.toList());
        }

        return this.repository
                .findAll()
                .stream()
                .map(mapper::toAgreementResponse)
                .collect(Collectors.toList());
    }

    public AgreementResponse findById(Integer id) {
        return this.repository
                .findById(id)
                .stream()
                .peek(item -> {
                    var houseInfo = houseClientService.getHouseById(item.getHouseId());
                    item.setHouseName(houseInfo.name());
                    item.setHousePrice(houseInfo.price());
                })
                .map(mapper::toAgreementDetailResponse)
                .findFirst()
                .orElseThrow(() -> new AgreementNotFoundException("Agreement not found with ID:: " + id));
    }

    public Agreement findByHouseId(Integer houseId) {
        return this.repository.findByHouseId(houseId);
    }

    public void update(AgreementRequest request) {
        var agreement = this.repository
                .findById(request.id())
                .orElseThrow(() -> new AgreementNotFoundException(String.format("Cannot update agreement:: No agreement found with the provided ID: %s", request.id())));
        mergeAgreement(agreement, request);
        this.repository.save(agreement);
    }

    public void delete(Integer id) {
        Agreement agreement = this.repository
                .findById(id)
                .orElseThrow(() -> new AgreementNotFoundException(String.format("Cannot update agreement:: No agreement found with the provided ID: %s", id)));

        agreement.getTenants().forEach(item -> {
            this.tenantService.delete(item.getId());
        });

        houseClient.updateState(agreement.getHouseId(), "available");
        this.repository.deleteById(id);
    }

    private void mergeAgreement(Agreement agreement, AgreementRequest request) {
        if (request.deposit() != null) {
            agreement.setDeposit(request.deposit());
        }
        if (request.houseId() != agreement.getHouseId()) {
            houseClient.updateState(request.houseId(), "reserved");
            houseClient.updateState(agreement.getHouseId(), "available");
            agreement.setHouseId(request.houseId());
        }
        if (request.startDate() != null) {
            agreement.setStartDate(LocalDate.parse(request.startDate()));
        }
        if (request.tenants() != null && request.tenants().size() != agreement.getTenants().size()) {
            List<Tenant> tenants = new ArrayList<>();
            for (TenantResponse tenant : request.tenants()) {
                tenants.add(this.tenantRepository.findById(tenant.id()).orElseThrow(() -> new TenantNotFoundException("Tenant not found with ID:: " + tenant.id())));
            }
            agreement.setTenants(tenants);
        }
    }
}
