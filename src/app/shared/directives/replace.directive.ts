import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appReplace]',
})
export class ReplaceDirective implements OnInit {
  @Input() appReplace!: AbstractControl | null;

  private formControl!: AbstractControl | null;

  constructor() {}

  ngOnInit() {
    this.formControl = this.appReplace;
  }
}
