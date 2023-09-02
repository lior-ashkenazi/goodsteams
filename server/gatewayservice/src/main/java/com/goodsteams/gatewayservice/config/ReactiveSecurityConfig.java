package com.goodsteams.gatewayservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;

@Configuration
@EnableWebFluxSecurity
public class ReactiveSecurityConfig {

    private final RsaKeyProperties jwtConfigProperties;

    @Value("${allowed.origins}")
    private String allowedOrigins;

    public ReactiveSecurityConfig(RsaKeyProperties jwtConfigProperties) {
        this.jwtConfigProperties = jwtConfigProperties;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .csrf().disable()
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/api/auth/register", "/api/auth/login").permitAll()
                        .anyExchange().authenticated())
                .oauth2ResourceServer(ServerHttpSecurity.OAuth2ResourceServerSpec::jwt)
                .exceptionHandling(exHandling -> {
                    exHandling.authenticationEntryPoint((exchange, ex) -> exchange.getResponse().setComplete().then(Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not Authenticated"))));
                    exHandling.accessDeniedHandler((exchange, denied) -> exchange.getResponse().setComplete().then(Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN, "Not Authorized"))));
                })
                .build();
    }


    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(jwtConfigProperties.publicKey()).build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedMethods(List.of("GET, POST, PUT, DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}