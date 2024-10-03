package com.lpthinh.identityservice.role;

import com.lpthinh.identityservice.permission.Permission;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    @Id
    String name;
    String description;

    @ManyToMany
    Set<Permission> permissions;
}