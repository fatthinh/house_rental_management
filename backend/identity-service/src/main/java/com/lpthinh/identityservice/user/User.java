package com.lpthinh.identityservice.user;

import com.lpthinh.identityservice.role.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="user", schema = "public", catalog = "identitydb")
public class User {
    @Id
    @Column(name = "user_id")
    private String id;
    @Column(name = "user_email")
    private String email;
    @Column(name = "user_password")
    private String password;
    @Column(name = "user_avatar")
    private String avatar;
    @Column(name = "user_state")
    private UserState state;

    @Column(name = "user_role")
    @ManyToMany
    private Set<Role> roles;

    @Transient
    private String name;
}
