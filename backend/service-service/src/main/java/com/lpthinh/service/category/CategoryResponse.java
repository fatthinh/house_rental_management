package com.lpthinh.service.category;

import java.math.BigDecimal;

public record CategoryResponse(
        Integer id,
        String name,
        Long price,
        String unit,
        Integer quantityPerUnit
) {
}
