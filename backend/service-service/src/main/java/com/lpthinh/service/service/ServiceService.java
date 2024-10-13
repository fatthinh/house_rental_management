package com.lpthinh.service.service;

import com.lpthinh.service.agreement.AgreementServiceClient;
import com.lpthinh.service.category.Category;
import com.lpthinh.service.category.CategoryService;
import com.lpthinh.service.exception.ServiceNotFoundException;
import com.lpthinh.service.invoice.InvoiceRequest;
import com.lpthinh.service.invoice.PaymentClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository repository;
    private final ServiceMapper mapper;
    private final PaymentClient paymentClient;
    private final CategoryService categoryService;
    private final AgreementServiceClient agreementService;

    public Long create(ServiceRequest request) {
        var service = mapper.toService(request);
        service.setServiceState(ServiceState.COMPLETED);
        return this.repository.save(service).getId();
    }

    public Service findPreviousService(Integer agreementId, Integer categoryId, LocalDateTime time) {
        return this.repository
                .findByAgreementId(agreementId)
                .stream()
                .filter(item -> item.getCategory().getId().equals(categoryId) && item.getCreatedAt().compareTo(time) < 0)
                .max(Comparator.comparing(Service::getCreatedAt))
                .orElse(null);
    }

    public void createSingle(ServiceRequest request) {
        var quantity = 0;
        if (!request.init()) {
            if (request.categoryId() == 1 || request.categoryId() == 2) {
                quantity = request.quantity() -
                        this.findPreviousService(request.agreementId(),
                                request.categoryId(),
                                LocalDateTime.now()).getQuantity();
            } else quantity = request.quantity();

            var serviceId = this.create(request);
            paymentClient.create(new InvoiceRequest(
                    request.categoryId() == 5 ?
                            agreementService.getAgreementById(request.agreementId()).housePrice() :
                            categoryService.findById(request.categoryId()).price() * quantity,
                    serviceId));
        } else {
            this.create(request);
        }
    }

    public void createMultiple(List<ServiceRequest> request) {
        request.forEach(this::createSingle);
    }

    public List<ServiceResponse> findAll(Map<String, String> params) {
        var services = this.repository.findAll();

        var agreementId = params.get("agreement-id");
        var month = params.get("month");
        var year = params.get("year");

        if (agreementId != null) {
            services = services
                    .stream()
                    .filter(s ->
                            s.getAgreementId().equals(Integer.parseInt(agreementId)))
                    .toList();
        }

        if (month != null) {
            services = services
                    .stream()
                    .filter(s ->
                            s.getCreatedAt().getMonthValue() == Integer.parseInt(month))
                    .toList();
        }

        if (year != null) {
            services = services
                    .stream()
                    .filter(s ->
                            s.getCreatedAt().getYear() == Integer.parseInt(year))
                    .toList();
        }

        if (params.get("category") != null) {
            services = services
                    .stream()
                    .filter(item -> item.getCategory().getId() == Integer.parseInt(params.get("category")))
                    .toList();
        }

        return services
                .stream()
                .peek(item -> {
                    if (item.getCategory().getId() == 1 || item.getCategory().getId() == 2) {
                        var prev = this.findPreviousService(item.getAgreementId(), item.getCategory().getId(), item.getCreatedAt());
                        if (prev != null)
                            item.setPrevQuantity(prev.getQuantity());
                    }
                })
                .map(mapper::toServiceResponse)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> findByInvoiceId(Integer agreementId) {
        return this.repository
                .findByAgreementId(agreementId)
                .stream()
                .map(mapper::toServiceResponse)
                .collect(Collectors.toList());
    }

    public ServiceResponse findById(Long id) {
        return this.repository
                .findById(id)
                .stream()
                .map(mapper::toServiceResponse)
                .findFirst()
                .orElseThrow(() -> new ServiceNotFoundException("Service not found with ID:: " + id));
    }

    public void update(ServiceRequest request) {
        var service = this.repository
                .findById(request.id())
                .orElseThrow(() -> new ServiceNotFoundException(String.format("Cannot update service:: No service found with the provided ID: %s", request.id())));
        mergeService(service, request);
        this.repository.save(service);
//        this.paymentClient.updateInvoiceAmount(service.getAgreementId());
    }

    public void updateAll(List<ServiceRequest> request) {
        request.forEach(this::update);
    }

    public void delete(Long id) {
        this.repository.deleteById(id);
    }

    private void mergeService(Service service, ServiceRequest request) {
        if (request.quantity() != null) {
            service.setQuantity(request.quantity());
        }
    }
}