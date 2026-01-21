package com.foodOps.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
@Slf4j
public class JwtTokenValidator extends OncePerRequestFilter {


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return path.startsWith("/swagger-ui")
                || path.startsWith("/auth/")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/actuator/")
                || path.equals("/swagger-ui.html")
                || path.equals("/error");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
        String requestUri = request.getRequestURI();
        String method = request.getMethod();



        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);

            try {
                SecretKey key =
                        Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

                Claims claims =
                        Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(jwt)
                                .getBody();

                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));
                log.info("--- Security Context Populated ---");
                log.info("Request: [{}] {}", method, requestUri);
                log.info("User: {}", email);
                log.info("Authorities in JWT: {}", authorities);
                log.info("----------------------------------");

                List<GrantedAuthority> auths =
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(email, null, auths);

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
                log.info("----------------------------------");
                log.error("validated");
                log.info("----------------------------------");

            } catch (Exception e) {
                log.info("----------------------------------");
                log.error("JWT Validation Failed for path [{}]: {}", requestUri, e.getMessage());
                log.info("----------------------------------");
                throw new BadCredentialsException("Invalid token");
            }
        }
        else {
            log.debug("No JWT found in request to: {}", requestUri);
        }

        filterChain.doFilter(request, response);
    }
}
