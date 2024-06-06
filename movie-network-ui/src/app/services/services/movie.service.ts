/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveReturnBorrowedMovie } from '../fn/movie/approve-return-borrowed-movie';
import { ApproveReturnBorrowedMovie$Params } from '../fn/movie/approve-return-borrowed-movie';
import { borrowMovie } from '../fn/movie/borrow-movie';
import { BorrowMovie$Params } from '../fn/movie/borrow-movie';
import { findAllBorrowedMovies } from '../fn/movie/find-all-borrowed-movies';
import { FindAllBorrowedMovies$Params } from '../fn/movie/find-all-borrowed-movies';
import { findAllMovies } from '../fn/movie/find-all-movies';
import { FindAllMovies$Params } from '../fn/movie/find-all-movies';
import { findAllMoviesByOwner } from '../fn/movie/find-all-movies-by-owner';
import { FindAllMoviesByOwner$Params } from '../fn/movie/find-all-movies-by-owner';
import { findAllReturnedMovies } from '../fn/movie/find-all-returned-movies';
import { FindAllReturnedMovies$Params } from '../fn/movie/find-all-returned-movies';
import { findMovieById } from '../fn/movie/find-movie-by-id';
import { FindMovieById$Params } from '../fn/movie/find-movie-by-id';
import { MovieResponse } from '../models/movie-response';
import { PageResponseBorrowedMovieResponse } from '../models/page-response-borrowed-movie-response';
import { PageResponseMovieResponse } from '../models/page-response-movie-response';
import { returnBorrowedMovie } from '../fn/movie/return-borrowed-movie';
import { ReturnBorrowedMovie$Params } from '../fn/movie/return-borrowed-movie';
import { saveMovie } from '../fn/movie/save-movie';
import { SaveMovie$Params } from '../fn/movie/save-movie';
import { updateArchivedStatus } from '../fn/movie/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/movie/update-archived-status';
import { updateShareableStatus } from '../fn/movie/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/movie/update-shareable-status';
import { uploadMovieCoverPicture } from '../fn/movie/upload-movie-cover-picture';
import { UploadMovieCoverPicture$Params } from '../fn/movie/upload-movie-cover-picture';

@Injectable({ providedIn: 'root' })
export class MovieService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllMovies()` */
  static readonly FindAllMoviesPath = '/movies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllMovies()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMovies$Response(params?: FindAllMovies$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMovieResponse>> {
    return findAllMovies(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllMovies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMovies(params?: FindAllMovies$Params, context?: HttpContext): Observable<PageResponseMovieResponse> {
    return this.findAllMovies$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMovieResponse>): PageResponseMovieResponse => r.body)
    );
  }

  /** Path part for operation `saveMovie()` */
  static readonly SaveMoviePath = '/movies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveMovie()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveMovie$Response(params: SaveMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveMovie$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveMovie(params: SaveMovie$Params, context?: HttpContext): Observable<number> {
    return this.saveMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadMovieCoverPicture()` */
  static readonly UploadMovieCoverPicturePath = '/movies/cover/{movie-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadMovieCoverPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMovieCoverPicture$Response(params: UploadMovieCoverPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadMovieCoverPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadMovieCoverPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMovieCoverPicture(params: UploadMovieCoverPicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadMovieCoverPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `borrowMovie()` */
  static readonly BorrowMoviePath = '/movies/borrow/{movie-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowMovie()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowMovie$Response(params: BorrowMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return borrowMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `borrowMovie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowMovie(params: BorrowMovie$Params, context?: HttpContext): Observable<number> {
    return this.borrowMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/movies/shareable/{movie-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnBorrowedMovie()` */
  static readonly ReturnBorrowedMoviePath = '/movies/borrow/return/{movie-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnBorrowedMovie()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedMovie$Response(params: ReturnBorrowedMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnBorrowedMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnBorrowedMovie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedMovie(params: ReturnBorrowedMovie$Params, context?: HttpContext): Observable<number> {
    return this.returnBorrowedMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveReturnBorrowedMovie()` */
  static readonly ApproveReturnBorrowedMoviePath = '/movies/borrow/return/approve/{movie-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnBorrowedMovie()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowedMovie$Response(params: ApproveReturnBorrowedMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveReturnBorrowedMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveReturnBorrowedMovie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowedMovie(params: ApproveReturnBorrowedMovie$Params, context?: HttpContext): Observable<number> {
    return this.approveReturnBorrowedMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/movies/archived/{movie-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findMovieById()` */
  static readonly FindMovieByIdPath = '/movies/{movie-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMovieById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMovieById$Response(params: FindMovieById$Params, context?: HttpContext): Observable<StrictHttpResponse<MovieResponse>> {
    return findMovieById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMovieById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMovieById(params: FindMovieById$Params, context?: HttpContext): Observable<MovieResponse> {
    return this.findMovieById$Response(params, context).pipe(
      map((r: StrictHttpResponse<MovieResponse>): MovieResponse => r.body)
    );
  }

  /** Path part for operation `findAllReturnedMovies()` */
  static readonly FindAllReturnedMoviesPath = '/movies/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllReturnedMovies()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedMovies$Response(params?: FindAllReturnedMovies$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedMovieResponse>> {
    return findAllReturnedMovies(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllReturnedMovies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedMovies(params?: FindAllReturnedMovies$Params, context?: HttpContext): Observable<PageResponseBorrowedMovieResponse> {
    return this.findAllReturnedMovies$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedMovieResponse>): PageResponseBorrowedMovieResponse => r.body)
    );
  }

  /** Path part for operation `findAllMoviesByOwner()` */
  static readonly FindAllMoviesByOwnerPath = '/movies/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllMoviesByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMoviesByOwner$Response(params?: FindAllMoviesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMovieResponse>> {
    return findAllMoviesByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllMoviesByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMoviesByOwner(params?: FindAllMoviesByOwner$Params, context?: HttpContext): Observable<PageResponseMovieResponse> {
    return this.findAllMoviesByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMovieResponse>): PageResponseMovieResponse => r.body)
    );
  }

  /** Path part for operation `findAllBorrowedMovies()` */
  static readonly FindAllBorrowedMoviesPath = '/movies/borrowed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBorrowedMovies()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedMovies$Response(params?: FindAllBorrowedMovies$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedMovieResponse>> {
    return findAllBorrowedMovies(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBorrowedMovies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedMovies(params?: FindAllBorrowedMovies$Params, context?: HttpContext): Observable<PageResponseBorrowedMovieResponse> {
    return this.findAllBorrowedMovies$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedMovieResponse>): PageResponseBorrowedMovieResponse => r.body)
    );
  }

}
