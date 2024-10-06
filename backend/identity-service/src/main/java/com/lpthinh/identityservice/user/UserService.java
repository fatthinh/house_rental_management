package com.lpthinh.identityservice.user;

import com.lpthinh.identityservice.role.Role;
import com.lpthinh.identityservice.role.RoleRepository;
import com.lpthinh.identityservice.tenant.TenantResponse;
import com.lpthinh.identityservice.tenant.TenantServiceClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.hibernate.mapping.Set;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final TenantServiceClient tenantServiceClient;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String create(UserRequest userRequest) {
        User user = this.createDef(userRequest);

        Role role = roleRepository.findById("USER").orElse(null);
        var roles = new HashSet<Role>();
        roles.add(role);
        user.setRoles(roles);

        return userRepository.save(user).getId();
    }

    public User createDef(UserRequest userRequest) {
        User newUser = userMapper.toUser(userRequest);
        return this.userRepository.save(newUser);
    }

    public TenantUserResponse findTenant(String id) {
        User user = userRepository.findById(id).orElse(null);
        TenantResponse tenant = tenantServiceClient.getTenantById(id);

        return this.userMapper.toTenantResponse(user, tenant);
    }
}
