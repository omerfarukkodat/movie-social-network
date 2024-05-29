package com.kodat.of.movie.movie;

import org.springframework.stereotype.Service;

@Service
public class MovieMapper {

    public Movie toMovie(MovieRequest request){
        return Movie.builder()
                .id(request.id())
                .title(request.title())
                .directorName(request.directorName())
                .synopsis(request.synopsis())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }

    public MovieResponse toMovieResponse(Movie movie) {
        return MovieResponse.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .directorName(movie.getDirectorName())
                .synopsis(movie.getSynopsis())
                .rate(movie.getRate())
                .archived(movie.isArchived())
                .shareable(movie.isShareable())
                .owner(movie.getOwner().fullName())
                .build();
    }
}
