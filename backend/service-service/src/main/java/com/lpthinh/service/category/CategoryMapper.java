package com.lpthinh.service.category;

import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public Category toCategory(CategoryRequest request) {
        if (request == null)
            return null;

        return Category
                .builder()
                .name(request.name())
                .price(request.price())
                .unit(request.unit())
                .quantityPerUnit(request.quantityPerUnit())
                .build();
    }


    public CategoryResponse toCategoryResponse(Category service) {
        return new CategoryResponse(
                service.getId(),
                service.getName(),
                service.getPrice(),
                service.getUnit(),
                service.getQuantityPerUnit()
        );
    }
}