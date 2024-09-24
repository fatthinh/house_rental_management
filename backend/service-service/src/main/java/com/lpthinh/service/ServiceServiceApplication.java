package com.lpthinh.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ServiceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceServiceApplication.class, args);
    }

}
