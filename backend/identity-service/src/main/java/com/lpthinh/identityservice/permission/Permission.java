package com.lpthinh.identityservice.permission;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    @Id
    private String name;
    private String description;
}
