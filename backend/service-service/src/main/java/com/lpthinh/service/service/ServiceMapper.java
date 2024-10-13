package com.lpthinh.service.service;

import com.lpthinh.service.category.Category;
import org.springframework.stereotype.Component;
import com.lpthinh.service.category.CategoryResponse;


import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

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
                .agreementId(request.agreementId())
                .quantity(request.quantity())
                .createdAt(request.init()
                        ? LocalDateTime.now().minus(1, ChronoUnit.MONTHS)
                        : LocalDateTime.now())
                .build();
    }


    public ServiceResponse toServiceResponse(Service service) {
        return new ServiceResponse(
                service.getId(),
                service.getCategory(),
                service.getAgreementId(),
                service.getServiceState(),
                service.getQuantity(),
                service.getCreatedAt(),
                service.getPrevQuantity()
        );
    }
}