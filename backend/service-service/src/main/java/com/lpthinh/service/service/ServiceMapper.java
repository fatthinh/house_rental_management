package com.lpthinh.service.service;

import com.lpthinh.service.category.Category;
import org.springframework.stereotype.Component;
import com.lpthinh.service.category.CategoryResponse;


import java.time.LocalDateTime;

@Component
public class ServiceMapper {

    public Service toService(ServiceRequest request) {
        if (request == null)
            return null;

        return Service
                .builder()
                .category(
                        Category.builder()
                                .id(request.categoryId())
                                .build()
                )
                .invoiceId(request.invoiceId())
                .quantity(request.quantity())
                .createdAt(LocalDateTime.now())
                .build();
    }


    public ServiceResponse toServiceResponse(Service service) {
        return new ServiceResponse(
                service.getId(),
                service.getCategory(),
                service.getInvoiceId(),
                service.getServiceState(),
                service.getQuantity(),
                service.getCreatedAt()
        );
    }
}