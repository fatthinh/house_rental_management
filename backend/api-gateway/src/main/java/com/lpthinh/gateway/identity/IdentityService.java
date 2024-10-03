package com.lpthinh.gateway.identity;

import com.lpthinh.gateway.dto.request.IntrospectRequest;
import com.lpthinh.gateway.dto.response.IntrospectResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IdentityService {
    IdentityClient identityClient;

    public Mono<ResponseEntity<IntrospectResponse>> introspect(String token) {
        return identityClient.introspect(new IntrospectRequest(token));
    }
}
