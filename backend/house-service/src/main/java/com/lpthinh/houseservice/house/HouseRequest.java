package com.lpthinh.houseservice.house;

import java.math.BigDecimal;

public record HouseRequest(
        Integer id,
        String name,
        BigDecimal price
) {
}
