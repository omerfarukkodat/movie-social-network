package com.kodat.of.movie.movie;

import com.kodat.of.movie.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("movies")
@Tag(name = "movie")
public class MovieController {

    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Integer> saveMovie(
            @Valid @RequestBody MovieRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));

    }

    @GetMapping("{movie-id}")
    public ResponseEntity<MovieResponse> findMovieById(
            @PathVariable("movie-id") Integer movieId
    ){
        return ResponseEntity.ok(service.findById(movieId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<MovieResponse>> findAllMovies(
            @RequestParam(name = "page" , defaultValue = "0" , required = false)int page,
            @RequestParam(name = "size" , defaultValue = "10" , required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllMovies(page,size,connectedUser));
    }


}
