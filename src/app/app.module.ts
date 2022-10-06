import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableOverviewExample } from './table-overview-example/table-overview-example';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from './material.module';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    NavbarComponent,
    TableOverviewExample,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
