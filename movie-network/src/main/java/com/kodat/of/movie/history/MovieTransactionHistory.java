package com.kodat.of.movie.history;

import com.kodat.of.movie.common.BaseEntity;
import com.kodat.of.movie.movie.Movie;
import com.kodat.of.movie.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class MovieTransactionHistory extends BaseEntity {

    // User relationship
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    //Movie relationship
    private Movie movie;

    private boolean returned;
    private boolean returnApproved;



}
