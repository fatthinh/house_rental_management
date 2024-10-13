package com.lpthinh.service.category;

import java.math.BigDecimal;

public record CategoryRequest(
        Integer id,
        String name,
        Long price,
        String unit,
        Integer quantityPerUnit
) {
}
