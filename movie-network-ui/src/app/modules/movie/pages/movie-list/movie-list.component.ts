import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../../services/services/movie.service";
import {Router} from "@angular/router";
import {PageResponseMovieResponse} from "../../../../services/models/page-response-movie-response";
import {MovieResponse} from "../../../../services/models/movie-response";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit{
  movieResponse: PageResponseMovieResponse = {};
   size = 5;
   page = 0;
   message:string = '';
   level:string = 'success';


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

  borrowMovie(movie: MovieResponse) {
    this.message = '';
    this.level = 'success';

    this.movieService.borrowMovie({
      'movie-id': movie.id as number
    }).subscribe({
      next: (): void => {
        this.level = 'success';
        this.message = 'Movie successfully added to your list';
      },
      error: (err): void => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });

  }
}
