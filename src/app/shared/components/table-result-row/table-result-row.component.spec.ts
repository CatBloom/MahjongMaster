import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResultRowComponent } from './table-result-row.component';

describe('TableResultRowComponent', () => {
  let component: TableResultRowComponent;
  let fixture: ComponentFixture<TableResultRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableResultRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResultRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
