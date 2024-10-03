package com.lpthinh.identityservice.invalidatedToken;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvalidatedToken {
    @Id
    String id;

    Date expiryTime;
}
