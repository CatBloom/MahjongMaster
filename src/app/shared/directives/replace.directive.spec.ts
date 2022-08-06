import { ReplaceDirective } from './replace.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input appReplace value="" />`,
})
class TestComponent {}

describe('ReplaceDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ReplaceDirective, TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges();
    de = fixture.debugElement.query(By.directive(ReplaceDirective));
  });

  it('Convert full-width characters to half-width characters', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '１２３４';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('1234');
  });

  it('Remove non number', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = 'abcdあいうえ123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('123');
  });

  it('Remove initial 0', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '00102';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('102');
  });

  it('Remove initial - except -', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '--12-34--5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('-12345');
  });

  it('Remove initial - after 0 ', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '-0012345';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toEqual('-12345');
  });

  it('Replace last two number 00 no.1', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '12345';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.value).toEqual('12300');
  });

  it('Replace last two number 00 no.2', () => {
    const input = de.nativeElement as HTMLInputElement;
    input.value = '-10';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.value).toEqual('-10');
  });
});
