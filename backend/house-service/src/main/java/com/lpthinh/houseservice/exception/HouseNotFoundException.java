package com.lpthinh.houseservice.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class HouseNotFoundException extends RuntimeException {
    private final String msg;
}
