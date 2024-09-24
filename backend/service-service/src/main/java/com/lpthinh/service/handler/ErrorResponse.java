package com.lpthinh.service.handler;

import java.util.Map;

public record ErrorResponse(
        Map<String, String> errors
) {
}
