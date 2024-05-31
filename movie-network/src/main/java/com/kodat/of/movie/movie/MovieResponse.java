package com.kodat.of.movie.movie;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieResponse {

    private Integer id;
    private String title;
    private String directorName;
    private String synopsis;
    private String owner;
    private byte[] movieCover;
    private double rate;
    private boolean archived;
    private boolean shareable;

}
