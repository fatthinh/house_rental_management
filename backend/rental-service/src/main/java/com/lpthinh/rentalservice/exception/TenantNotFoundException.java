package com.lpthinh.rentalservice.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TenantNotFoundException extends RuntimeException {
    private final String msg;
}
