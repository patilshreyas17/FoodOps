package com.foodOps.service;

import com.foodOps.Exceptions.UserException;
import com.foodOps.config.JwtProvider;
import com.foodOps.model.User;
import com.foodOps.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email=jwtProvider.getEmailFromJwtToken(jwt);


        User user = userRepository.findByEmail(email);

        if(user==null) {
            throw new UserException("user not exist with email "+email);
        }

        return user;
    }

    @Override
    public User findUserByEmail(String username) throws UserException {

        User user=userRepository.findByEmail(username);

        if(user!=null) {

            return user;
        }

        throw new UserException("user not exist with username "+username);
    }
}
