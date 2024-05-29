package com.kodat.of.movie;

import com.kodat.of.movie.user.UserRepository;
import com.kodat.of.movie.user.role.Role;
import com.kodat.of.movie.user.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class MovieNetworkApplication  {


    public static void main(String[] args) {
        SpringApplication.run(MovieNetworkApplication.class, args);
    }

   @Bean
    public CommandLineRunner run(RoleRepository repository) throws Exception {
       return args -> {
           if (repository.findByName("USER").isEmpty()){
               repository.save(
                       Role.builder().name("USER").build()
               );
           }
       };
    }
}
