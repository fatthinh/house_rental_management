package com.lpthinh.service.service;

import com.lpthinh.service.exception.ServiceNotFoundException;
import com.lpthinh.service.invoice.PaymentClient;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository repository;
    private final ServiceMapper mapper;
    private final PaymentClient paymentClient;

    public Long create(ServiceRequest request) {
        var service = mapper.toService(request);

        service.setServiceState(ServiceState.COMPLETED);
        return this.repository.save(service).getId();
    }

    public void createMultiple(List<ServiceRequest> request) {
        request.forEach(this::create);
        paymentClient.changeInvoiceState(request.getFirst().invoiceId(), "unpaid");
    }

    public List<ServiceResponse> findAll(Map<String, String> params) {

        if (params.get("invoice_id") != null) {
            return this.repository
                    .findByInvoiceId(Long.parseLong(params.get("invoice_id")))
                    .stream()
                    .map(mapper::toServiceResponse)
                    .collect(Collectors.toList());
        }

        return this.repository
                .findAll()
                .stream()
                .map(mapper::toServiceResponse)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> findByInvoiceId(Long invoiceId) {
        return this.repository
                .findByInvoiceId(invoiceId)
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
        this.paymentClient.updateInvoiceAmount(service.getInvoiceId());
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