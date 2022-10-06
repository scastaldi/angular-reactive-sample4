import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTableComponent } from './table-overview-example';

describe('SampleTableComponent', () => {
  let component: SampleTableComponent;
  let fixture: ComponentFixture<SampleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
