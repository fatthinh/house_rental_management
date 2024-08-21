package com.lpthinh.houseservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class HouseServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(HouseServiceApplication.class, args);
	}
}
