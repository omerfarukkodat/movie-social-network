import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../../services/services/movie.service";
import {Router} from "@angular/router";
import {PageResponseMovieResponse} from "../../../../services/models/page-response-movie-response";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit{
  movieResponse: PageResponseMovieResponse = {};
   size = 5;
   page = 0;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllMovies()
  }

 private findAllMovies(): void {
    this.movieService.findAllMovies(
      {
      page: this.page,
        size: this.size
        }
    ).subscribe(
      {
        next: (movies) =>{
        this.movieResponse = movies;
        }
      });
 }

}
