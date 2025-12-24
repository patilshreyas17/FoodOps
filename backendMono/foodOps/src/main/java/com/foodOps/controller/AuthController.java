package com.foodOps.controller;


import com.foodOps.config.JwtProvider;
import com.foodOps.domain.USER_ROLE;
import com.foodOps.model.Cart;
import com.foodOps.model.User;
import com.foodOps.repository.CartRepository;
import com.foodOps.repository.UserRepository;
import com.foodOps.request.LoginRequest;
import com.foodOps.response.AuthResponse;
import com.foodOps.service.CustomeUserServiceImplementation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;
    private CustomeUserServiceImplementation customUserDetails;
    private CartRepository cartRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {
        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if (isEmailExist != null) {
            throw new Exception("Email already exist");
        }
        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());

        User savedUser = userRepository.save(createdUser);
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);


        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }
@PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody LoginRequest  req) throws Exception {
            String userName = req.getEmail();
            String password = req.getPassword();
            Authentication authentication = authencicate(userName, password);
        String jwt = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty()? null:    authorities.iterator().next().getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(role));
        return new ResponseEntity<>(authResponse, HttpStatus.OK);



    }

    private Authentication authencicate(String userName, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(userName);
        if(userDetails == null) {
            throw new RuntimeException("User not found");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {

            throw new BadCredentialsException("Invalid username or password");
        }
        return  new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}