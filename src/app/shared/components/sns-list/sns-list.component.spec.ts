import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SNSListComponent } from './sns-list.component';

describe('SNSListComponent', () => {
  let component: SNSListComponent;
  let fixture: ComponentFixture<SNSListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SNSListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SNSListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
