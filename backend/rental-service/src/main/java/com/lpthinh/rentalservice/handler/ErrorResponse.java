package com.lpthinh.rentalservice.handler;

import java.util.Map;

public record ErrorResponse(
        Map<String, String> errors
) {
}
