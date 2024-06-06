/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseMovieResponse } from '../../models/page-response-movie-response';

export interface FindAllMovies$Params {
  page?: number;
  size?: number;
}

export function findAllMovies(http: HttpClient, rootUrl: string, params?: FindAllMovies$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMovieResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllMovies.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseMovieResponse>;
    })
  );
}

findAllMovies.PATH = '/movies';
