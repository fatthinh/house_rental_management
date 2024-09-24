package com.lpthinh.service.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ServiceNotFoundException extends RuntimeException {
    private final String msg;
}