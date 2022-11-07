import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueListEditComponent } from './league-list-edit.component';

describe('LeagueListEditComponent', () => {
  let component: LeagueListEditComponent;
  let fixture: ComponentFixture<LeagueListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueListEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
