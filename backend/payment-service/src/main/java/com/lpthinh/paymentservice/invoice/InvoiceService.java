package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.exception.InvoiceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository repository;
    private final InvoiceMapper mapper;

    public String create(InvoiceRequest request) {
        var invoice = mapper.toInvoice(request);
        return this.repository.save(invoice).getId();
    }

    public List<InvoiceResponse> findAll() {
        return this.repository
                .findAll()
                .stream()
                .map(mapper::toInvoiceResponse)
                .collect(Collectors.toList());
    }

    public InvoiceResponse findById(String id) {
        return this.repository
                .findById(id)
                .stream()
                .map(mapper::toInvoiceResponse)
                .findFirst()
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with ID:: " + id));
    }

    public void update(InvoiceRequest request) {
        var invoice = this.repository
                .findById(request.id())
                .orElseThrow(() -> new InvoiceNotFoundException(String.format("Cannot update invoice:: No invoice found with the provided ID: %s", request.id())));
        mergeInvoice(invoice, request);
        this.repository.save(invoice);
    }

    public void delete(String id) {
        this.repository.deleteById(id);
    }

    private void mergeInvoice(Invoice invoice, InvoiceRequest request) {
        if (StringUtils.isNotBlank(request.agreementId())) {
            invoice.setAgreementId(request.agreementId());
        }
        if (request.month() != null) {
            invoice.setMonth(InvoiceMonth.values()[request.month() - 1]);
        }
        if (request.amount() != null) {
            invoice.setAmount(request.amount());
        }
    }
}