package com.example.backend.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@EnableWebSecurity
@Configuration
public class SecurityConfig {


   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
       CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
       requestHandler.setCsrfRequestAttributeName(null);

       return http.csrf(csrf -> csrf
                       .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                       .csrfTokenRequestHandler(requestHandler))
                .httpBasic(Customizer.withDefaults())
               .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
               .and()
                .authorizeHttpRequests(httpRequests ->
                httpRequests
                        .requestMatchers(HttpMethod.GET,"api/gifs").permitAll()
                        .requestMatchers("/api/gifs/**").authenticated()

                        .requestMatchers(HttpMethod.GET,"api/gifs/**").permitAll()
                        .requestMatchers("api/gifs/**").permitAll()
                        .requestMatchers("api/users/me").permitAll()
                        .anyRequest().permitAll()
                )
                .build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

}
