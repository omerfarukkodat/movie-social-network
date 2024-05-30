package com.kodat.of.movie.movie;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedMovieResponse {

    private Integer id;
    private String title;
    private String directorName;
    private double rate;
    private boolean returned;
    private boolean returnedApproved;
}
