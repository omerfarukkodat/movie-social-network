/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MovieResponse } from '../../models/movie-response';

export interface FindMovieById$Params {
  'movie-id': number;
}

export function findMovieById(http: HttpClient, rootUrl: string, params: FindMovieById$Params, context?: HttpContext): Observable<StrictHttpResponse<MovieResponse>> {
  const rb = new RequestBuilder(rootUrl, findMovieById.PATH, 'get');
  if (params) {
    rb.path('movie-id', params['movie-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MovieResponse>;
    })
  );
}

findMovieById.PATH = '/movies/{movie-id}';
