/* tslint:disable */
/* eslint-disable */
import { MovieResponse } from '../models/movie-response';
export interface PageResponseMovieResponse {
  content?: Array<MovieResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
