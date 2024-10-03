package com.lpthinh.identityservice.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public String create(UserRequest userRequest) {
        User newUser = userMapper.toUser(userRequest);
        return this.userRepository.save(newUser).getId();
    }
}
