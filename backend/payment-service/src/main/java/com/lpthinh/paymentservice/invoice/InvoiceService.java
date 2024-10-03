package com.lpthinh.paymentservice.invoice;

import com.lpthinh.paymentservice.rental.RentalClient;
import com.lpthinh.paymentservice.exception.InvoiceNotFoundException;
import com.lpthinh.paymentservice.service.ServiceClient;
import com.lpthinh.paymentservice.service.ServiceResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository repository;
    private final InvoiceMapper mapper;
    private final RentalClient rentalClient;
    private final ServiceClient serviceClient;

    public Integer create(InvoiceRequest request) {
        var invoice = mapper.toInvoice(request);
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setState(InvoiceState.PENDING);
        return this.repository.save(invoice).getId();
    }

    public void createByAgreements() {
        var agreements = this.rentalClient.getAgreements();
        for (var agreement : agreements) {
            InvoiceRequest request = new InvoiceRequest(
                    null,
                    null,
                    LocalDate.now().getMonthValue() + 1,
                    agreement.id());
            this.create(request);
        }
    }

    public void updateAmount(Integer id) {
        var invoice = this.repository
                .findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with ID:: " + id));

        var serviceResponse = serviceClient.getByInvoiceId(invoice.getId());
        var agreement = rentalClient.getAgreementById(invoice.getAgreementId());
        Long total = agreement.housePrice();
        for (ServiceResponse service : serviceResponse) {
            total = total + service.category().price() * service.quantity();
        }

        invoice.setAmount(total);

        this.repository.save(invoice);
    }

    public void changeState(Integer id, String state) {
        var invoice = this.repository
                .findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with ID:: " + id));
        invoice.setState(InvoiceState.valueOf(state.toUpperCase()));

        this.updateAmount(id);
        this.repository.save(invoice);
    }

    public List<InvoiceResponse> findAll(Map<String, String> params) {
        var invoices = repository.findAll().stream().peek(invoice -> {
            var agreement = this.rentalClient.getAgreementById(invoice.getAgreementId());
            invoice.setHouseName(agreement.houseName());
        });


        if (params.get("month") != null) {
            return invoices
                    .filter(item -> item.getMonth() == InvoiceMonth.valueOf(params.get("month").toUpperCase()))
                    .map(mapper::toInvoiceResponse)
                    .collect(Collectors.toList());
        }

        if (params.get("state") != null) {
            return invoices
                    .filter(item -> item.getState() == InvoiceState.valueOf(params.get("state").toUpperCase()))
                    .map(mapper::toInvoiceResponse)
                    .collect(Collectors.toList());
        }

        return invoices
                .map(mapper::toInvoiceResponse)
                .collect(Collectors.toList());
    }

//    public InvoiceResponse findById(Integer id) {
//        return this.repository
//                .findById(id)
//                .stream()
//                .peek(item -> {
//                    var agreement = rentalClient.getAgreementById(item.getAgreementId());
//                    var serviceResponse = serviceClient.getByInvoiceId(item.getId());
//                    item.setHouseName(agreement.houseName());
//                    item.setHousePrice(agreement.housePrice());
//                    item.setServices(serviceResponse);
//                })
//                .map(mapper::toInvoiceResponse)
//                .findFirst()
//                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with ID:: " + id));
//    }

    public Invoice findById(Integer id) {
        return this.repository
                .findById(id)
                .stream()
                .peek(item -> {
                    var agreement = rentalClient.getAgreementById(item.getAgreementId());
                    var serviceResponse = serviceClient.getByInvoiceId(item.getId());
                    item.setHouseName(agreement.houseName());
                    item.setHousePrice(agreement.housePrice());
                    item.setServices(serviceResponse);
                })
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

    public void delete(Integer id) {
        this.repository.deleteById(id);
    }

    private void mergeInvoice(Invoice invoice, InvoiceRequest request) {
        if (request.agreementId() != null) {
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