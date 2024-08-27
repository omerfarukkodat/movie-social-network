import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MovieResponse} from "../../../../services/models/movie-response";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {


  private _movie: MovieResponse = {};
  private _manage = false;
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
      return 'data:image/jpg;base64, ' + this._movie.movieCover;
    }
    return this._movieCover;
  }

  get manage(): boolean {
    return this._manage;
  }
@Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share: EventEmitter<MovieResponse> = new EventEmitter<MovieResponse>();
  @Output() private archive: EventEmitter<MovieResponse> = new EventEmitter<MovieResponse>();
  @Output() private addToWaitingList: EventEmitter<MovieResponse> = new EventEmitter<MovieResponse>();
  @Output() private borrow: EventEmitter<MovieResponse> = new EventEmitter<MovieResponse>();
  @Output() private edit: EventEmitter<MovieResponse> = new EventEmitter<MovieResponse>();
  @Output() private details: EventEmitter<MovieResponse> = new EventEmitter<MovieResponse>();

  onShowDetails() {
    this.details.emit(this._movie)
  }

  onAddToWaitingList() {
  this.addToWaitingList.emit(this._movie)
  }

  onBorrow() {
  this.borrow.emit(this._movie)
  }

  onEdit() {
  this.edit.emit(this._movie)
  }

  onShare() {
this.share.emit(this._movie)
  }

  onArchive() {
this.archive.emit(this._movie)
  }






}
