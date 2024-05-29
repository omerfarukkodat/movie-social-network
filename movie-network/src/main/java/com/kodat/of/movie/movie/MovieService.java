package com.kodat.of.movie.movie;

import com.kodat.of.movie.common.PageResponse;
import com.kodat.of.movie.user.entity.CustomUserDetails;
import com.kodat.of.movie.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieMapper movieMapper;
    private final MovieRepository movieRepository;

    public MovieService(MovieMapper movieMapper, MovieRepository movieRepository) {
        this.movieMapper = movieMapper;
        this.movieRepository = movieRepository;
    }


    public Integer save(MovieRequest request, Authentication connectedUser) {

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Movie movie = movieMapper.toMovie(request);
        movie.setOwner(user);

        return movieRepository.save(movie).getId();


    }


    public MovieResponse findById(Integer movieId) {
        return movieRepository.findById(movieId)
                .map(movieMapper::toMovieResponse)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with the movie id: " + movieId));
    }

    public PageResponse<MovieResponse> findAllMovies(int page, int size, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Movie> movies = movieRepository.findAllDisplayableBooks(pageable, user.getId());
        List<MovieResponse> movieResponse = movies.stream()
                .map(movieMapper::toMovieResponse)
                .toList();
        return new PageResponse<>(
                movieResponse,
                movies.getNumber(),
                movies.getSize(),
                movies.getTotalElements(),
                movies.getTotalPages(),
                movies.isFirst(),
                movies.isLast()
                );

    }
}
