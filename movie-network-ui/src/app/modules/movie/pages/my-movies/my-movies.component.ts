import {Component, OnInit} from '@angular/core';
import {PageResponseMovieResponse} from "../../../../services/models/page-response-movie-response";
import {MovieService} from "../../../../services/services/movie.service";
import {Router} from "@angular/router";
import {MovieResponse} from "../../../../services/models/movie-response";

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss']
})
export class MyMoviesComponent implements OnInit{
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
    this.movieService.findAllMoviesByOwner(
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

  goToFirstPage() {
    this.page = 0;
    this.findAllMovies();

  }

  goToPreviousPage() {
    this.page --;
    this.findAllMovies();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllMovies();
  }

  goToLastPage() {
    this.page = this.movieResponse.totalPages as number -1;
    this.findAllMovies();
  }

  goToNextPage() {
    this.page++;
    this.findAllMovies();
  }

  get isLastPAge(): boolean {
    return this.page == this.movieResponse.totalPages as number -1;
  }


  archiveMovie(movie: MovieResponse) {
  this.movieService.updateArchivedStatus({
    'movie-id': movie.id as number
  }).subscribe({
    next: (): void => {
      movie.archived = !movie.archived;
    }
  })
  }

  shareMovie(movie: MovieResponse) {
  this.movieService.updateShareableStatus({
    'movie-id': movie.id as number
  }).subscribe({
    next: (): void => {
      movie.shareable = !movie.shareable;
    }
  });
  }

  editMovie(movie: MovieResponse) {
  this.router.navigate(['movies','manage',movie.id])
  }
}
