import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListEditComponent } from './player-list-edit.component';

describe('PlayerListEditComponent', () => {
  let component: PlayerListEditComponent;
  let fixture: ComponentFixture<PlayerListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerListEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
