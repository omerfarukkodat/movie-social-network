package com.kodat.of.movie.user.entity;

import com.kodat.of.movie.history.MovieTransactionHistory;
import com.kodat.of.movie.movie.Movie;
import com.kodat.of.movie.user.role.Role;
import com.kodat.of.movie.user.token.Token;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@SuperBuilder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;
    private String password;
    private String address;
    private LocalDate dateOfBirth;
    private boolean accountLocked;
    private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

    @OneToMany(mappedBy = "owner")
    private List<Movie> movies;

    @OneToMany(mappedBy = "user")
    private List<MovieTransactionHistory> histories;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true)
    private Set<Token> tokens;

    public String fullName() {
        return firstname + " " + lastname;
    }


}
