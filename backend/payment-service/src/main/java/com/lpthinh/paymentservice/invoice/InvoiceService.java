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
import java.util.ArrayList;
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
        invoice.setState(InvoiceState.UNPAID);
        return this.repository.save(invoice).getId();
    }

    public void createByAgreements() {
//        var agreements = this.rentalClient.getAgreements();
//        for (var agreement : agreements) {
//            InvoiceRequest request = new InvoiceRequest(
//                    null,
//                    null,
//                    LocalDate.now().getMonthValue(),
//                    agreement.id());
//            this.create(request);
//        }
    }

    public void updateAmount(Integer id) {
        var invoice = this.repository
                .findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with ID:: " + id));

        var serviceResponse = serviceClient.getByInvoiceId(invoice.getId());
//        var agreement = rentalClient.getAgreementById(invoice.getAgreementId());
//        var start_date = agreement.startDate();
//        Long total = agreement.housePrice();
//        if (start_date.getMonth() == LocalDate.now().getMonth() &&
//                start_date.getYear() == LocalDate.now().getYear()) {
//
//            int totalDays = LocalDate.of(start_date.getYear(), start_date.getMonthValue(), 1).lengthOfMonth();
//            int usedDays = totalDays - start_date.getDayOfMonth() + 1;
//            // Calculate the proportional amount
//            total = total * usedDays / totalDays;
//        }
//
//        for (ServiceResponse service : serviceResponse) {
//            total = total + service.category().price() * service.quantity();
//        }
//
//        invoice.setAmount(total);

        this.repository.save(invoice);
    }

    public void changeState(Integer id, String state) {
        var invoice = this.repository
                .findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with ID:: " + id));
        invoice.setState(InvoiceState.valueOf(state.toUpperCase()));

        this.repository.save(invoice);
    }

    public List<InvoiceResponse> findAll(Map<String, String> params) {
        var invoices = repository.findAll();

        if (params.get("service-id") != null) {
            invoices = invoices
                    .stream()
                    .filter(item -> item.getServiceId() == Long.parseLong(params.get("service-id")))
                    .toList();
        }

        if (params.get("state") != null) {
            invoices = invoices
                    .stream()
                    .filter(item -> item.getState() == InvoiceState.valueOf(params.get("state").toUpperCase()))
                    .toList();
        }

        return invoices
                .stream()
                .map(mapper::toInvoiceResponse)
                .collect(Collectors.toList());
    }

    public List<InvoiceResponse> findByServices(List<Long> serviceIds) {
        List<Invoice> invoices = new ArrayList<>();
        for (Long serviceId : serviceIds) {
            var inv = this.repository.findByService(serviceId);
            invoices.add(inv);
        }
        return invoices.stream().map(mapper::toInvoiceResponse).collect(Collectors.toList());
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
        if (request.amount() != null) {
            invoice.setAmount(request.amount());
        }
    }
}