package com.lpthinh.rentalservice.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AgreementNotFoundException extends RuntimeException {
    private final String msg;
}
