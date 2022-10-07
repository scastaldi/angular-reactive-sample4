import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  from,
  map,
  mergeAll,
  switchMap,
  of,
  lastValueFrom,
  mergeMap,
  combineLatest,
  BehaviorSubject,
  tap,
  delay,
  pipe,
  catchError,
  EMPTY,
} from 'rxjs';
import { TicketMasterEvent, TicketMasterRoot } from './ticket-master.interface';

@Injectable()
export class TicketMasterService {
  constructor(private _httpClient: HttpClient) {}

  private eventKeyword = new BehaviorSubject<string>('');
  private eventSize= new BehaviorSubject<number>(5);
  private eventPage = new BehaviorSubject<number>(1);
  eventKeywordSelectedAction$ = this.eventKeyword.asObservable();
  eventSizeSelectedAction$ = this.eventSize.asObservable();
  eventPageSelectedAction$ = this.eventPage.asObservable();
  
  public eventKeywordSelectedAction(keyword: string) {
    this.eventKeyword.next(keyword);
  }

  public eventSizeSelectedAction(size: number) {
    this.eventSize.next(size);
  }

  public eventPageSelectedAction(page: number) {
    this.eventPage.next(page);
  }

  public eventWithParams$ = combineLatest(
    [this.eventKeywordSelectedAction$,
    this.eventSizeSelectedAction$,
    this.eventPageSelectedAction$]
  ).pipe(
    delay(1000),
    tap(() => console.log('first delay')),
    map(([keyword, size, page]) => {
      const param = `https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=${keyword}&locale=*&size=${size}&page=${page}`;
      return this._httpClient
      .get<TicketMasterRoot>(param)
      .pipe(
        delay(1000),
        tap(() => console.log('now we call the service', keyword, size, page)),
        switchMap((root) => of<TicketMasterEvent[]>(root._embedded?.events)))
      }
    ));
}
