package com.lpthinh.service.category;

import java.math.BigDecimal;

public record CategoryRequest(
        Integer id,
        String name,
        BigDecimal price,
        String unit,
        Integer quantityPerUnit
) {
}
