import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TicketMasterEvent } from '../ticket-master.interface';
import { TicketMasterService } from '../ticket-master.service';

@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'table-overview-example.html',
})
export class TableOverviewExample {
  displayedColumns: string[] = ['id', 'name', 'images'];
  dataSource: MatTableDataSource<TicketMasterEvent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  events$ = this._ticketMasterService.eventWithParams$;
  constructor(private _ticketMasterService: TicketMasterService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._ticketMasterService.eventKeywordSelectedAction(filterValue);
  }

  public handlePage(e: any) {
    this._ticketMasterService.eventPageSelectedAction(e.pageIndex);
    this._ticketMasterService.eventSizeSelectedAction(e.pageSize);
  }
}

