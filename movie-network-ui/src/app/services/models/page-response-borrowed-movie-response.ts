/* tslint:disable */
/* eslint-disable */
import { BorrowedMovieResponse } from '../models/borrowed-movie-response';
export interface PageResponseBorrowedMovieResponse {
  content?: Array<BorrowedMovieResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
