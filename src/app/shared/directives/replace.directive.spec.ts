import { ReplaceDirective } from './replace.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `<input appReplace value="" maxlength="6" [formControl]="test" />`,
})
class TestComponent {
  test: FormControl = new FormControl('');
}

describe('ReplaceDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: NgControl, useValue: FormControl }],
      declarations: [ReplaceDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();
    de = fixture.debugElement.query(By.directive(ReplaceDirective));
  });

  it('Convert full-width numbers to half-width numbers', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '１２３４';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('1234');
  });

  it('Convert hyphen characters to half-width hyphen', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('-');
  });

  it('Remove non number', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = 'abcdあいうえ123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('123');
  });

  it('Remove hyphen except initial hyphen no.1', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '12-34--5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('12345');
  });

  it('Remove hyphen except initial hyphen no.2', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '--12-34--5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('-12345');
  });

  it('Remove initial 0', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '00102';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.value).toEqual('102');
  });

  it('Remove 0 after initial hyphen', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '-0012345';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.value).toEqual('-12345');
  });

  it('blank return blank', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.value).toEqual('');
  });

  it('non number return blank', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '..123-';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.value).toEqual('');
  });
});
