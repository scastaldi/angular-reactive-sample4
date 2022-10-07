import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import {
  map,
  switchMap,
  of,
  combineLatest,
  BehaviorSubject,
  tap,
  delay,
  catchError,
  EMPTY,
  Observable,
} from 'rxjs';
import { TicketMasterEvent, TicketMasterRoot } from './ticket-master.interface';

@Injectable()
export class TicketMasterService {
  constructor(private _httpClient: HttpClient) {}

  private eventKeyword = new BehaviorSubject<string>('');
  private eventSize= new BehaviorSubject<number>(5);
  private eventPage = new BehaviorSubject<number>(1);
  keywordSelectedAction$ = this.eventKeyword.asObservable();
  sizeSelectedAction$ = this.eventSize.asObservable();
  pageSelectedAction$ = this.eventPage.asObservable();
  
  public keywordSelectedAction(keyword: string) {
    this.eventKeyword.next(keyword);
  }

  public sizeSelectedAction(size: number) {
    this.eventSize.next(size);
  }

  public pageSelectedAction(page: number) {
    this.eventPage.next(page);
  }

  public eventWithParams$ = combineLatest(
    [this.keywordSelectedAction$,
    this.sizeSelectedAction$,
    this.pageSelectedAction$]
  ).pipe(
    delay(1000),
    tap(() => console.log('first delay')),
    switchMap(([keyword, size, page]) => {
      const param = `https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=${keyword}&locale=*&size=${size}&page=${page}`;
      return this._httpClient
      .get<TicketMasterRoot>(param)
      .pipe(
        delay(1000),
        tap(() => console.log(`now we call the service keyword:${keyword}, size:${size}, page:${page}`)),
        map((root) => of<TicketMasterEvent[]>(root._embedded?.events)),
        catchError(error => this.handleError(error)),
        )
      }
    ));


    public handleError(err: HttpErrorResponse): Observable<TicketMasterEvent[]> {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        if (err.status > 1) {
          errorMessage = `Backend returned code ${err.status}: ${err.message}`;
        } else {
          errorMessage = 'Backend did not respond, please try again later'
        }
      }
      console.error('detail error: ', err);
      console.error('user friendly error: ', errorMessage);
      return of<TicketMasterEvent[]>([]) //EMPTY; // throwError(() => errorMessage);
    }
}
