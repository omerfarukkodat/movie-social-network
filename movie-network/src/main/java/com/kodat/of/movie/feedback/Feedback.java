package com.kodat.of.movie.feedback;


import com.kodat.of.movie.common.BaseEntity;
import com.kodat.of.movie.movie.Movie;
import jakarta.persistence.*;
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
public class Feedback extends BaseEntity {

    private Double rate;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;


}
