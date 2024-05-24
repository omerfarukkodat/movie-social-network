package com.kodat.of.movie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MovieNetworkApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieNetworkApplication.class, args);
    }

}
