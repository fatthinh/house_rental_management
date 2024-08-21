package com.lpthinh.rentalservice.agreement;

import com.lpthinh.rentalservice.exception.AgreementNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgreementService {
    private final AgreementRepository repository;
    private final AgreementMapper mapper;

    public String create(AgreementRequest request) {
        var agreement = mapper.toAgreement(request);
        return this.repository.save(agreement).getId();
    }

    public List<AgreementResponse> findAll() {
        return this.repository
                .findAll()
                .stream()
                .map(mapper::toAgreementResponse)
                .collect(Collectors.toList());
    }

    public AgreementResponse findById(String id) {
        return this.repository
                .findById(id)
                .stream()
                .map(mapper::toAgreementResponse)
                .findFirst()
                .orElseThrow(() -> new AgreementNotFoundException("Agreement not found with ID:: " + id));
    }

    public void update(AgreementRequest request) {
        var agreement = this.repository
                .findById(request.id())
                .orElseThrow(() -> new AgreementNotFoundException(String.format("Cannot update agreement:: No agreement found with the provided ID: %s", request.id())));
        mergeAgreement(agreement, request);
        this.repository.save(agreement);
    }

    public void delete(String id) {
        this.repository.deleteById(id);
    }

    private void mergeAgreement(Agreement agreement, AgreementRequest request) {
        if (request.deposit() != null) {
            agreement.setDeposit(request.deposit());
        }
        if (request.houseId() != null) {
            agreement.setHouseId(request.houseId());
        }
        if (request.tenants() != null) {
            agreement.setTenants(request.tenants());
        }
    }
}
