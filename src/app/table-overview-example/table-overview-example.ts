import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TicketMasterService } from '../ticket-master.service';

@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'table-overview-example.html',
})
export class TableOverviewExample {
  displayedColumns: string[] = ['id', 'name', 'images'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  events$ = this._ticketMasterService.eventWithParams$;
  constructor(private _ticketMasterService: TicketMasterService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._ticketMasterService.keywordSelectedAction(filterValue);
  }

  public handlePage(e: any) {
    this._ticketMasterService.pageSelectedAction(e.pageIndex);
    this._ticketMasterService.sizeSelectedAction(e.pageSize);
  }
}

