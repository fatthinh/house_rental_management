package com.lpthinh.service.category;

import java.math.BigDecimal;

public record CategoryResponse(
        Integer id,
        String name,
        BigDecimal price,
        String unit,
        Integer quantityPerUnit
) {
}
