package com.lpthinh.identityservice.user;

import com.lpthinh.identityservice.role.Role;
import com.lpthinh.identityservice.role.RoleRepository;
import com.lpthinh.identityservice.tenant.TenantResponse;
import com.lpthinh.identityservice.tenant.TenantServiceClient;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.hibernate.mapping.Set;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final TenantServiceClient tenantServiceClient;

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

    public List<TenantUserResponse> findUsers(String name) {
        List<TenantResponse> tenantResponseList = tenantServiceClient.getTenantByName(name.trim());
        List<TenantUserResponse> userResponseList = new ArrayList<>();

        for (TenantResponse tenantResponse : tenantResponseList) {
            User u = this.userRepository.findById(tenantResponse.id()).orElse(null);
            if (u != null) {
                userResponseList.add(userMapper.toTenantResponse(u, tenantResponse));
            }
        }

        return userResponseList;
    }

    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email not found"));
    }

    public TenantUserResponse findTenantByEmail(String email) {
        User user = this.findByEmail(email);
        TenantResponse tenant = tenantServiceClient.getTenantById(user.getId());
        return this.userMapper.toTenantResponse(user, tenant);
    }

//    public UserResponse findUser(String token) {
////        User user = userRepository.findBy;
//    }
}
