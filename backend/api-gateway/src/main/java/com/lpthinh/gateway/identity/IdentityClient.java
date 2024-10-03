package com.lpthinh.gateway.identity;

import com.lpthinh.gateway.dto.request.IntrospectRequest;
import com.lpthinh.gateway.dto.response.IntrospectResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;

public interface IdentityClient {
    @PostExchange(url = "/auth/introspect", contentType = MediaType.APPLICATION_JSON_VALUE)
    Mono<ResponseEntity<IntrospectResponse>> introspect(@RequestBody IntrospectRequest request);
}
