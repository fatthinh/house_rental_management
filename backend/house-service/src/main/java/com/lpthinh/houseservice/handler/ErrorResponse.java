package com.lpthinh.houseservice.handler;

import java.util.Map;

public record ErrorResponse(
        Map<String, String> errors
) {
}
