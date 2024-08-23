package com.lpthinh.paymentservice.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class InvoiceNotFoundException extends RuntimeException {
    private final String msg;
}