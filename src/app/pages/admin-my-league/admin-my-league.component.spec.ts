import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMyLeagueComponent } from './admin-my-league.component';

describe('AdminMyLeagueComponent', () => {
  let component: AdminMyLeagueComponent;
  let fixture: ComponentFixture<AdminMyLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMyLeagueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMyLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
