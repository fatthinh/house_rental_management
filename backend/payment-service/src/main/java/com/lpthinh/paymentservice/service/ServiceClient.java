package com.lpthinh.paymentservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
@RequiredArgsConstructor
public class ServiceClient {

    @Value("${application.config.service-url}")
    private String serviceUrl;
    private final RestTemplate restTemplate;

    public List<ServiceResponse> getByInvoiceId(Integer invoiceId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ParameterizedTypeReference<List<ServiceResponse>> responseType = new ParameterizedTypeReference<>() {
        };

        ResponseEntity<List<ServiceResponse>> entityResponse = restTemplate.exchange(
                serviceUrl + "?invoice_id=" + invoiceId,
                GET,
                entity,
                responseType
        );
        return entityResponse.getBody();
    }
}
