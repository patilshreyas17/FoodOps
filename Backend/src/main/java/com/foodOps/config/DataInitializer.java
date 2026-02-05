package com.foodOps.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.foodOps.model.User;
import com.foodOps.domain.USER_ROLE;
import com.foodOps.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            User existingAdmin = userRepository.findByEmail("admin@foodops.com");

            if (existingAdmin == null) {
                User admin = new User();
                admin.setEmail("admin@foodops.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setFullName("Super Admin");
                admin.setRole(USER_ROLE.ROLE_ADMIN);
                admin.setStatus("ACTIVE");

                userRepository.save(admin);

            }
        };
    }
}
