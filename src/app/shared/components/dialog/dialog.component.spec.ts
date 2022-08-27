import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data status', () => {
    component.data.status = '削除';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.dialog__status')).nativeElement;
    expect(el.textContent).toBe('本当に削除してよろしいですか？');
  });

  it('data text', () => {
    component.data.text = 'テスト';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.dialog__text')).nativeElement;
    expect(el.textContent).toBe('テスト');
  });

  it('data not text', () => {
    component.data.text = undefined;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.dialog__text'));
    expect(el).toBeNull();
  });
});
