package com.lpthinh.paymentservice.handler;

import java.util.Map;

public record ErrorResponse(
        Map<String, String> errors
) {
}