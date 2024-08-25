import {Component, Input} from '@angular/core';
import {MovieResponse} from "../../../../services/models/movie-response";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {


  private _movie: MovieResponse = {};
  private _movieCover: string | undefined;


  get movie(): MovieResponse {
    return this._movie;
  }

  @Input()
  set movie(value: MovieResponse) {
    this._movie = value;
  }

  get movieCover(): string | undefined {
    if (this._movie.movieCover){
      return '';
    }
    return this._movieCover;
  }
}
