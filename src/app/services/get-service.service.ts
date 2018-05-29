import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { KEY } from '../secret';

@Injectable()
export class GetService {

  constructor(private http: Http) {

  }

  getCoordinates(address) {
    let apiURL = `http://open.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}&maxResults=1`;
    return this.http.get(apiURL).pipe(
      map(res => res.json()),
      catchError(this.handleError(`getCoordinates address=${address}`))
    );
    
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    console.error(error); 

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }

}
