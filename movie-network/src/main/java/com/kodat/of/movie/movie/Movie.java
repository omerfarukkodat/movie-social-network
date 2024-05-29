package com.kodat.of.movie.movie;

import com.kodat.of.movie.common.BaseEntity;
import com.kodat.of.movie.feedback.Feedback;
import com.kodat.of.movie.history.MovieTransactionHistory;
import com.kodat.of.movie.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class Movie extends BaseEntity {

    private String title;
    private String directorName;
    private String synopsis;
    private String movieCover;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "movie")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "movie")
    private List<MovieTransactionHistory> movieTransactionHistories;

    @Transient
    public double getRate(){
        if (feedbacks == null || feedbacks.isEmpty()){
            return 0.0;
        }
        var rate = this.feedbacks.stream()
                .mapToDouble(Feedback::getRate)
                .average()
                .orElse(0.0);

        double roundedRate = Math.round(rate * 10.0) / 10.0;
    return roundedRate;
    }


}
